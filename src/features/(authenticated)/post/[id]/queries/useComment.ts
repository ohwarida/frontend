'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getComments, createComment, deleteComment, updateComment } from '../apis/comment.api'
import { GetCommentsResponse } from '../types/Comment.types'

const commentKey = (postId: number) => ['comment', postId] as const

// 댓글 조회
export function useGetCommentsQuery(postId: number) {
  return useQuery<GetCommentsResponse>({
    queryKey: commentKey(postId),
    queryFn: () => getComments(postId),
  })
}

// 댓글/대댓글 생성
export function useCreateCommentMutation(postId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: { parentId: number | null; content: string }) =>
      createComment({ postId, parentId: input.parentId, content: input.content }),
    onSuccess: () => qc.invalidateQueries({ queryKey: commentKey(postId) }),
  })
}

// 댓글 수정
export function useUpdateCommentMutation(postId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: { commentId: number; content: string }) =>
      updateComment({ commentId: input.commentId, body: { content: input.content } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: commentKey(postId) }),
  })
}

// 댓글 삭제
export function useDeleteCommentMutation(postId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: commentKey(postId) }),
  })
}
