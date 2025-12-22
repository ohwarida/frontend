'use server'

import { server, safeJson } from '@/lib/api/server'
import type {
  CreatePostRequest,
  GetPostDetailResponse,
  GetPostsResponse,
  UpdatePostRequest,
} from '../types/Post.types'
import { TopicType } from '../../create/types/Topic.types'

type GetPostsParams = {
  cursorId?: number
  size?: number
  topic?: TopicType
}

// TODO: getPosts가 topic/cursor/size 등을 쿼리로 받을 수 있게 되면, 전체 조회 후 프론트 필터링을 제거하고 서버에서 topic 필터링된 결과만 받아오도록 변경.
export async function getPosts(params: GetPostsParams = {}): Promise<GetPostsResponse> {
  const searchParams = new URLSearchParams()

  if (params.topic) searchParams.set('topic', params.topic)
  if (typeof params.cursorId === 'number') searchParams.set('cursorId', String(params.cursorId))
  if (typeof params.size === 'number') searchParams.set('size', String(params.size))
  const query = searchParams.toString()

  const res = await server(`/api/v1/posts/summary${query ? `?${query}` : ''}`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('게시글 전체 조회 실패')
  const data = await safeJson<GetPostsResponse>(res)
  if (!data) throw new Error('게시글 전체 응답이 비어있음')
  return data
}

export async function getPostDetail(postId: number): Promise<GetPostDetailResponse> {
  const res = await server(`/api/v1/posts/${postId}`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('게시글 상세 조회 실패')
  const data = await safeJson<GetPostDetailResponse>(res)
  if (!data) throw new Error('게시글 상세 응답이 비어있음')
  return data
}

export async function createPost(input: CreatePostRequest) {
  const res = await server(`/api/v1/posts`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('게시글 생성 실패')

  return res.headers.get('Location')
}

export async function updatePost(input: UpdatePostRequest) {
  const { postId, ...body } = input

  const res = await server(`/api/v1/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('게시글 수정 실패')
  return await safeJson(res)
}

export async function deletePost(postId: number) {
  const res = await server(`/api/v1/posts/${postId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('게시글 삭제 실패')
  return { ok: true }
}
