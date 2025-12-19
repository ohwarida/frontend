'use server'

import { cookies } from 'next/headers'
import { IS_PROD } from '@/constants/env'
import {
  ACCESS_TOKEN_MAX_AGE,
  ACCESS_TOKEN_PATH,
  ACCESS_TOKEN_SAME_SITE,
  REFRESH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_PATH,
  REFRESH_TOKEN_SAME_SITE,
} from '@/constants/token'
import { Token } from '@/types/Token.types'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!

export async function server(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)

  const doFetch = (overrideAccessToken?: string) => {
    const h = new Headers(headers)
    if (overrideAccessToken) h.set('Authorization', `Bearer ${overrideAccessToken}`)

    return fetch(`${API_BASE}${endpoint}`, {
      ...options,
      method: options.method ?? 'GET',
      headers: h,
      body: options.body ?? undefined,
      cache: options.cache ?? 'no-store',
    })
  }

  const res = await doFetch()

  // 401이면 refresh 후 재시도 (로직 그대로 유지)
  if (res.status === 401) {
    const token = (await refreshAccessToken()) as Token | null
    if (!token?.accessToken) return res // refresh 실패면 원래 응답 반환
    return doFetch(token.accessToken)
  }

  return res
}

// 액션에서 res.json() 대신 쓸 안전 파서(204이면 성공이지만 빈 값)
export async function safeJson<T>(res: Response): Promise<T | null> {
  if (res.status === 204) return null
  const text = await res.text()
  if (!text.trim()) return null
  return JSON.parse(text) as T
}

async function refreshAccessToken(): Promise<{ accessToken: string; refreshToken: string } | null> {
  const cookieStore = await cookies()

  const refreshToken = cookieStore.get('refresh_token')?.value
  if (!refreshToken) return null

  const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  })

  if (!res.ok) return null

  const setCookies: string[] = res.headers.getSetCookie?.() ?? []
  const newAccessToken = setCookies
    .find((sc) => sc.startsWith('accessToken='))
    ?.slice('accessToken='.length)
    .split(';', 1)[0]
  const newRefreshToken = setCookies
    .find((sc) => sc.startsWith('refreshToken='))
    ?.slice('refreshToken='.length)
    .split(';', 1)[0]

  if (!newAccessToken || !newRefreshToken) return null

  cookieStore.set('access_token', newAccessToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: ACCESS_TOKEN_SAME_SITE,
    path: ACCESS_TOKEN_PATH,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  })

  cookieStore.set('refresh_token', newRefreshToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: REFRESH_TOKEN_SAME_SITE,
    path: REFRESH_TOKEN_PATH,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  })

  return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}
