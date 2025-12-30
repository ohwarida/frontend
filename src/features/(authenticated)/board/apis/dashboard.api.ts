'use server'

import { server, safeJson } from '@/lib/api/server'
import { GetDashboardResponse } from '../types/Dashboard.type'

export async function getDashboard(): Promise<GetDashboardResponse> {
  const res = await server(`/api/v1/dashboard/overview`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('대시보드 조회 실패')
  const data = await safeJson<GetDashboardResponse>(res)
  if (!data) throw new Error('대시보드 응답이 비어있음')
  return data
}
