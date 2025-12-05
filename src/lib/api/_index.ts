import type { ApiClient } from './types'
import { createFetchApiClient } from '@/lib/api/fetchHttp'

let client: ApiClient | null = null
// 나중에 ky 구현이 생기면 여기 수정 부탁요
export function getApiClient(): ApiClient {
  if (!client) {
    client = createFetchApiClient() // 나중에 ky로
  }
  return client
}

export const api = getApiClient()
