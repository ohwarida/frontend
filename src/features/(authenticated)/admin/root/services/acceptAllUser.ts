'use server'

import { server } from '@/lib/api/server'
import { revalidatePath } from 'next/cache'

type params = {
  ids: number[]
  trackId: number
}
export async function acceptAllUser(params: params): Promise<void> {
  const { ids, trackId } = params
  await server(`/api/v1/admin/users/decisions`, {
    method: 'PUT',
    body: JSON.stringify({ ids, role: 'MEMBER', requestStatus: 'ACCEPTED' }),
  })
  revalidatePath(`/admin/${trackId}`)
}
