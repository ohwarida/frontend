import { client } from '@/lib/api/client'
import { HttpErrorTypes } from '@/types/HttpError.types'

async function example<TRes, TBody = unknown>(
  path: string,
  opts: {
    method: MethodTypes
    body?: TBody
    cache?: RequestCache
    baseUrl?: string
    credentials?: RequestCredentials
    retryAuth?: boolean
  },
) {
  const { retryAuth = true, ...rest } = opts

  try {
    return await client<TRes, TBody>(path, rest)
  } catch (e) {
    if (retryAuth && e instanceof HttpErrorTypes && e.status === 401) {
      await clientRefresh()
      return await client<TRes, TBody>(path, { ...rest })
    }
    throw e
  }
}

/** 위에가 예제 일단 내가 생각한 그림 */
export async function clientRefresh() {
  await client<{ ok: boolean }>('/api/auth/refresh', {
    method: 'POST',
    cache: 'no-store',
  })
}
