'use server'

import {
  UserRequestStatus,
  UserRole,
} from '@/features/(authenticated)/admin/root/types/AdminPage.types'
import { server } from '@/lib/api/server'
import { revalidatePath } from 'next/cache'

type params = {
  id: number
  trackId: number
  role: UserRole
  requestStatus: UserRequestStatus
}
export async function decisionUser(params: params): Promise<void> {
  const { id, trackId, ...body } = params
  const res = await server(`/api/v1/admin/users/${id}/decision`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
  console.log(res)
  revalidatePath(`/admin/${trackId}`)
}
