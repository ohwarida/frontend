export type FetchOptions = {
  cache?: RequestCache // 'force-cache' | 'no-store' ...
  revalidate?: number // Next ISR (ex: 10 = 10초 후 자동 재검증)
}

export interface ApiClient {
  get<T = unknown>(endpoint: string, options?: FetchOptions): Promise<T>
  post<T = unknown>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T>
  patch<T = unknown>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T>
  delete<T = unknown>(endpoint: string, options?: FetchOptions): Promise<T>
}
