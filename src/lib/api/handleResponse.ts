import { HttpError } from '@/types/HttpErorr'

export const handleResponse = async <T>(
  res: Response,
  method: string,
  endpoint: string,
): Promise<T> => {
  // 실패 응답 처리
  if (!res.ok) {
    let body: unknown = null

    try {
      body = await res.json()
    } catch (_) {
      body = null
    }

    const error = new Error(`${method} ${endpoint} failed: ${res.status}`) as HttpError
    error.status = res.status
    error.body = body
    throw error
  }

  // 204 No Content 바디 없음
  if (res.status === 204) {
    return {} as T
  }

  // JSON parse 시도 → 실패하면 No Content 로 간주
  try {
    return (await res.json()) as T
  } catch (_) {
    return { message: 'no content' } as T
  }
}
