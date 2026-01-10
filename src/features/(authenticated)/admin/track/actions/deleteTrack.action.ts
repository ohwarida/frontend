'use server'

import { safeJson, server } from '@/lib/api/server'
import { revalidatePath } from 'next/cache'

export async function deleteTrackAction(id: number) {
  if (!id) throw new Error('id is required')

  const res = await server(`/api/v1/admin/tracks/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
    next: { tags: ['tracks'] },
  })
  revalidatePath('/admin/track')
  return safeJson(res)
}
