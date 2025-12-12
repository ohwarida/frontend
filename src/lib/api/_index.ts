import type { ApiClient } from './types'
import { createFetchApiClient } from '@/lib/api/fetchHttp'

const externalBaseUrl = process.env.NEXT_PUBLIC_API_BASE

if (!externalBaseUrl) throw new Error('NEXT_PUBLIC_API_BASE를 .env에 정의해주세요.')

export const api: ApiClient = createFetchApiClient(externalBaseUrl) // 외부 서버용
export const nextApi: ApiClient = createFetchApiClient('') // Nest API 라우트용
