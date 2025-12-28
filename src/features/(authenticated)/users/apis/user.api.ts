'use server'

import { server, safeJson } from '@/lib/api/server'
import { redirect } from 'next/navigation'
import type { GetUserResponse } from '../types/User.type'

export async function getUser(): Promise<GetUserResponse> {
  const res = await server('/api/v1/users/myInfo', { method: 'GET', cache: 'no-store' })

  if (res.status === 401 || res.status === 403) {
    redirect('/signin')
  }

  if (!res.ok) throw new Error(`유저 조회 실패: ${res.status}`)

  const data = await safeJson<GetUserResponse>(res)
  if (!data) throw new Error('유저 조회 실패: empty body')

  return data
}
