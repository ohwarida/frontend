'use client'

export async function client(
  path: string,
  opts: {
    method: MethodTypes
    body?: unknown
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

  return res
}
