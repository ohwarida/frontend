'use server'

import { server, safeJson } from '@/lib/api/server'
import {
  CreateReactionRequest,
  DeleteReactionRequest,
  GetPostDetailReactionResponse,
  GetPostsReactionRequest,
  GetPostsReactionResponse,
  GetCommentsReactionRequest,
  GetCommentsReactionResponse,
} from '../types/Reaction.types'

export async function createReaction(input: CreateReactionRequest) {
  const res = await server(`/api/v1/reactions`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('리액션 추가 실패')
  return await safeJson(res)
}

export async function deleteReaction(input: DeleteReactionRequest) {
  const res = await server(`/api/v1/reactions`, { method: 'DELETE', body: JSON.stringify(input) })
  if (!res.ok) throw new Error('리액션 취소 실패')
  return { ok: true }
}

export async function getPostDetailReaction(
  postId: number,
): Promise<GetPostDetailReactionResponse> {
  const res = await server(`/api/v1/reactions/posts/${postId}`, { method: 'GET' })
  if (!res.ok) throw new Error('게시글 상세 리액션 조회 실패')
  return (
    (await safeJson<GetPostDetailReactionResponse>(res)) ?? ({} as GetPostDetailReactionResponse)
  )
}

export async function getPostsReaction(
  input: GetPostsReactionRequest,
): Promise<GetPostsReactionResponse> {
  const res = await server(`/api/v1/reactions/posts`, {
    method: 'GET',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('게시글 목록 리액션 조회 실패')
  return (await safeJson<GetPostsReactionResponse>(res)) ?? {}
}

export async function getCommentsReaction(
  input: GetCommentsReactionRequest,
): Promise<GetCommentsReactionResponse> {
  const res = await server(`/api/v1/reactions/comments`, {
    method: 'GET',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('댓글 목록 리액션 조회 실패')
  return (await safeJson<GetCommentsReactionResponse>(res)) ?? {}
}
