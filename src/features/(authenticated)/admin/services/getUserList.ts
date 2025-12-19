import { PageResponse, UserRow } from '@/features/(authenticated)/admin/types/AdminPage.types'
import { cookies } from 'next/headers'
import { server } from '@/lib/api/server'

export type GetUserListParams = {
  page: number
  size: number
  sort?: string[]
  condition?: Partial<{
    q: string
    role: string
    status: string
    requestStatus: string
    trackId: number
    name: string
    email: string
  }>
}

export async function getUserList(params: GetUserListParams): Promise<PageResponse<UserRow>> {
  const sp = new URLSearchParams()
  sp.set('page', String(params.page))
  sp.set('size', String(params.size))

  for (const s of params.sort ?? []) sp.append('sort', s)

  const c = params.condition ?? {}
  for (const [k, v] of Object.entries(c)) {
    if (v === undefined || v === null || v === '') continue
    sp.set(k, String(v))
  }

  const res = await server(`/api/v1/admin/users/all?${sp.toString()}`)

  return res.json()
}
