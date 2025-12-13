'use client'

import { HttpErrorTypes } from '@/types/HttpError.types'

export async function client<TRes, TBody = unknown>(
  path: string,
  opts: {
    method: MethodTypes
    body?: TBody
    cache?: RequestCache
    baseUrl?: string
    credentials?: RequestCredentials
  },
) {
  const { method, body, cache, baseUrl = '', credentials = 'include' } = opts

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache,
    credentials,
  })

  if (res.status === 204) return null as TRes

  const data = await res.json().catch(() => null)
  if (!res.ok) throw new HttpErrorTypes(res.status, data?.message ?? `HTTP ${res.status}`, data)
  return data as TRes
}
