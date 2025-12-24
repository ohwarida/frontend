'use server'

import { cookies } from 'next/headers'
import { applySetCookies } from '@/utils/applySetCookie'
import { ACCESS_TOKEN } from '@/constants/token'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!

export async function server(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

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
      credentials: 'include',
    })
  }

  const res = await doFetch()

  const setCookies: string[] =
    res.headers.getSetCookie?.() ??
    (res.headers.get('set-cookie') ? [res.headers.get('set-cookie')!] : [])

  await applySetCookies(setCookies)

  return res
}

// 액션에서 res.json() 대신 쓸 안전 파서(204이면 성공이지만 빈 값)
export async function safeJson<T>(res: Response): Promise<T | null> {
  if (res.status === 204) return null
  const text = await res.text()
  if (!text.trim()) return null
  return JSON.parse(text) as T
}
