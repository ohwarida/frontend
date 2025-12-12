import type { ApiClient, FetchOptions } from './types'
import { handleResponse } from '@/lib/api/handleResponse'

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
  const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/auth/refresh`, {
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

export function createFetchApiClient(baseUrl: string = ''): ApiClient {
  const createHeaders = (custom: Record<string, string> = {}) => {
    const headers: Record<string, string> = { ...custom }

    // if (accessToken) {
    //   headers['Authorization'] = `Bearer ${accessToken}`
    // }

    return headers
  }

  const get = async <T = unknown>(endpoint = '', options?: FetchOptions): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      headers: createHeaders(),
      cache: options?.cache, // 브라우저/서버 캐시
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })

    return handleResponse<T>(res, 'GET', endpoint)
  }

  const post = async <T = unknown>(
    endpoint = '',
    data?: unknown,
    options?: FetchOptions,
  ): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: createHeaders({ 'Content-Type': 'application/json' }),
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })

    return handleResponse<T>(res, 'POST', endpoint)
  }

  const patch = async <T = unknown>(
    endpoint = '',
    data?: unknown,
    options?: FetchOptions,
  ): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: createHeaders({ 'Content-Type': 'application/json' }),
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      body: JSON.stringify(data || {}),
    })

    return handleResponse<T>(res, 'PATCH', endpoint)
  }

  const del = async <T = unknown>(endpoint = '', options?: FetchOptions): Promise<T> => {
    const res = await fetchWithAuth(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: createHeaders({ 'Content-Type': 'application/json' }),
      cache: options?.cache ?? 'no-store',
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    })

    return handleResponse<T>(res, 'DELETE', endpoint)
  }

  return { get, post, patch, delete: del }
}
