'use server'

import { server } from '@/lib/api/server'
import { MentionUser } from '@/hooks/useMentionUsers'

export async function getMentionUsers(sp: string) {
  const res = await server(`/api/v1/users?${sp}`)
  console.log(res)
  if (!res.ok) throw new Error('멘션 유저 조회 실패')
  return (await res.json()) as MentionUser[]
}
