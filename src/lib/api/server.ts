import 'server-only'
import { cookies } from 'next/headers'
import { HttpErrorTypes } from '@/types/HttpError.types'
import { IS_PROD } from '@/constants/env'
import { ACCESS_TOKEN_MAX_AGE, ACCESS_TOKEN_PATH, ACCESS_TOKEN_SAME_SITE } from '@/constants/token'

export async function server<TRes, TBody = unknown>(
  path: string,
  opts: {
    method: MethodTypes
    body?: TBody
    cache?: RequestCache
    revalidate?: number | false
    tags?: string[]
    retryAuth?: boolean
  },
) {
  const { method, body, cache, revalidate, tags, retryAuth = true } = opts

  const doFetch = async (accessToken?: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE!}${path}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next: revalidate !== undefined || tags ? { revalidate, tags } : undefined,
    })
  }

  // 1) 첫 시도
  const jar = await cookies()
  let token = jar.get('access_token')?.value
  let res = await doFetch(token)

  // 2) 401이면 refresh 후 1회 재시도
  if (res.status === 401 && retryAuth) {
    const ok = await refreshAccessToken()
    if (ok) {
      token = (await cookies()).get('access_token')?.value
      res = await doFetch(token)
    }
  }

  if (res.status === 204) return null as TRes

  const data = await res.json().catch(() => null)
  if (!res.ok) throw new HttpErrorTypes(res.status, data?.message ?? `HTTP ${res.status}`, data)
  return data as TRes
}

async function refreshAccessToken(): Promise<string | null> {
  const jar = await cookies()
  const refreshToken = jar.get('refresh_token')?.value
  if (!refreshToken) return null

  const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE!}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  })

  if (!r.ok) return null

  const data = (await r.json()) as RefreshResponse

  jar.set('access_token', data.accessToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: ACCESS_TOKEN_SAME_SITE,
    path: ACCESS_TOKEN_PATH, // 보통 '/'
    maxAge: ACCESS_TOKEN_MAX_AGE,
  })
  return data.accessToken
}
