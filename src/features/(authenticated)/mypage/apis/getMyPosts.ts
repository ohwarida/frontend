import { GetPostsResponse } from '@/features/(authenticated)/post/types/Post.types'
import { safeJson, server } from '@/lib/api/server'

export async function getMyPosts(params: GetMyParams = {}): Promise<GetPostsResponse> {
  const searchParams = new URLSearchParams()

  if (typeof params.page === 'number') searchParams.set('page', String(params.page))
  if (params.size) searchParams.set('size', String(params.size))
  const query = searchParams.toString()

  const res = await server(`/api/v1/posts/me${query ? `?${query}` : ''}`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('내가 쓴 게시글 전체 조회 실패')
  const data = await safeJson<GetPostsResponse>(res)
  if (!data) throw new Error('내가 쓴 게시글 전체 응답이 비어있음')
  return data
}
