'use server'

import { UserRequestStatus, UserRole } from '@/features/(authenticated)/admin/types/AdminPage.types'
import { safeJson, server } from '@/lib/api/server'

type params = {
  id: number
  role: UserRole
  requestStatus: UserRequestStatus
}
export async function decisionUser(params: params): Promise<null> {
  const res = await server('/api/v1/admin/users/decision', {
    method: 'PUT',
    body: JSON.stringify(params),
  })
  return safeJson(res)
}
