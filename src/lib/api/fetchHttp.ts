import type { ApiClient, FetchOptions } from './types'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

if (!baseUrl) {
  throw new Error('이거 정의 해주세요.')
}

async function fetchWithAuth(
  url: string,
  options: RequestInit & { revalidate?: number; retry?: boolean } = {},
) {
  const response = await fetch(url, {
    ...options,
    next: options.revalidate ? { revalidate: options.revalidate } : undefined,
    credentials: 'include',
  })

  // 성공 or 401
  if (response.status !== 401) return response

  // 이미 retry했다면 무한루프 방지 → 강제 로그아웃 처리
  if (options.retry) {
    throw new Error('UNAUTHORIZED')
  }

  // refresh 요청
  const refreshRes = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!refreshRes.ok) {
    throw new Error('UNAUTHORIZED')
  }

  // retry=true 추가하여 재요청 (1회만 허용)
  return fetchWithAuth(url, {
    ...options,
    retry: true,
  })
}

export function createFetchApiClient(): ApiClient {
  const get = async <T = unknown>(endpoint = '', options?: FetchOptions): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      cache: options?.cache, // 브라우저/서버 캐시
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })
    if (!res.ok) throw new Error(`GET failed: ${res.status}`)
    return res.json()
  }

  const post = async <T = unknown>(
    endpoint = '',
    data?: unknown,
    options?: FetchOptions,
  ): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })
    if (!res.ok) throw new Error(`POST failed: ${res.status}`)
    return res.json()
  }

  const patch = async <T = unknown>(
    endpoint = '',
    data?: unknown,
    options?: FetchOptions,
  ): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })
    if (!res.ok) throw new Error(`PATCH failed: ${res.status}`)
    return res.json()
  }

  const del = async <T = unknown>(endpoint = '', options?: FetchOptions): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`)
    return res.json()
  }

  return { get, post, patch, delete: del }
}
