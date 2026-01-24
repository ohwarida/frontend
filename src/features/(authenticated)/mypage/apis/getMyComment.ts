'use server'

import { safeJson, server } from '@/lib/api/server'
import { GetMyCommentsResponse } from '@/features/(authenticated)/mypage/types/getMyCommentsResponse'

export async function getMyComments(params: GetMyParams = {}): Promise<GetMyCommentsResponse> {
  const searchParams = new URLSearchParams()

  if (typeof params.page === 'number') searchParams.set('page', String(params.page))
  if (params.size) searchParams.set('size', String(params.size))
  const query = searchParams.toString()

  const res = await server(`/api/v1/comments/me${query ? `?${query}` : ''}`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('내가 쓴 댓글 전체 조회 실패')
  const data = await safeJson<GetMyCommentsResponse>(res)
  if (!data) throw new Error('내가 쓴 댓글 전체 응답이 비어있음')
  return data
}
