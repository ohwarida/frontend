'use server'

import { server, safeJson } from '@/lib/api/server'
import { TopicType } from '@/types/Topic.types'
import {
  GetPostsResponse,
  GetPostDetailResponse,
  CreatePostRequest,
  UpdatePostRequest,
} from '../types/Post.types'

type GetPostsParams = {
  page?: number
  size?: number
  topic?: TopicType
}

export async function getPosts(params: GetPostsParams = {}): Promise<GetPostsResponse> {
  const searchParams = new URLSearchParams()

  if (params.topic) searchParams.set('topic', params.topic)
  if (typeof params.page === 'number') searchParams.set('page', String(params.page))
  if (params.size) searchParams.set('size', String(params.size))
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
