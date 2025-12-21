'use server'

import { server, safeJson } from '@/lib/api/server'
import type { GetUserResponse } from '../types/User.type'

export async function getUser(): Promise<GetUserResponse> {
  const res = await server('/api/v1/users/myInfo', { method: 'GET' })
  if (!res.ok) throw new Error('유저 조회 실패')

  const data = await safeJson<GetUserResponse>(res)
  if (!data) throw new Error('유저 조회 실패: empty body')

  return data
}
