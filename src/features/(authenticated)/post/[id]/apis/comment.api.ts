'use server'

import type {
  CreateCommentRequest,
  GetCommentsResponse,
  UpdateCommentRequest,
} from '../types/Comment.types'
import { server, safeJson } from '@/lib/api/server'

export async function getComments(postId: number): Promise<GetCommentsResponse> {
  const res = await server(`/api/v1/comments/${postId}`, { method: 'GET' })
  if (!res.ok) throw new Error('댓글 조회 실패')
  return (await safeJson<GetCommentsResponse>(res)) ?? ([] as unknown as GetCommentsResponse)
}

export async function createComment(input: CreateCommentRequest) {
  const res = await server(`/api/v1/comments`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
  if (res.status === 201) return null
  if (!res.ok) throw new Error('댓글 작성 실패')
  return await safeJson(res)
}

export async function updateComment(input: { commentId: number; body: UpdateCommentRequest }) {
  const res = await server(`/api/v1/comments/${input.commentId}`, {
    method: 'PUT',
    body: JSON.stringify(input.body),
  })
  if (!res.ok) throw new Error('댓글 수정 실패')
  return await safeJson(res)
}

export async function deleteComment(commentId: number) {
  const res = await server(`/api/v1/comments/${commentId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('댓글 삭제 실패')
  return { ok: true }
}
