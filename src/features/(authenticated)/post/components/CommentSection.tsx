'use client'

import { useEffect, useMemo } from 'react'
import { Send } from 'lucide-react'
import type { Comment } from '../types/Comment.types'
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
} from '../queries/useComment'
import { CommentItem } from './CommentItem'
import { useCommentSectionState } from '../hooks/useCommentSectionState'

export function CommentSection({
  postId,
  userId,
  commentsCount,
}: {
  postId: number
  userId: number
  commentsCount?: number
}) {
  const currentUserId = userId

  const { data: comments = { contents: [], hasNext: false, nexPage: null } } =
    useGetCommentsQuery(postId)

  const totalCount = useMemo(() => countAll(comments.contents), [comments])

  const createMut = useCreateCommentMutation(postId)
  const updateMut = useUpdateCommentMutation(postId)
  const deleteMut = useDeleteCommentMutation(postId)

  const { commentText, setCommentText, resetCommentText, setActions, clearActions } =
    useCommentSectionState(postId)

  const canSubmit = commentText.trim().length > 0

  const actions = useMemo(
    () => ({
      postId,
      currentUserId,
      onCreate: (input: { parentId: number | null; content: string }) =>
        createMut.mutateAsync(input),
      onUpdate: (input: { commentId: number; content: string }) => updateMut.mutateAsync(input),
      onDelete: (id: number) => deleteMut.mutateAsync(id),
    }),
    [postId, currentUserId, createMut, updateMut, deleteMut],
  )

  useEffect(() => {
    setActions(actions)
    return () => clearActions()
  }, [actions, setActions, clearActions])

  return (
    <section aria-label="댓글" className="flex flex-col gap-4">
      <h2 className="text-[24px] leading-[36px] font-normal text-[#101828]">댓글 {totalCount}</h2>

      <ol className="flex flex-col gap-6">
        {comments.contents.map((c) => (
          <CommentItem key={c.commentId} postId={postId} comment={c} depth={0} />
        ))}
      </ol>

      <form
        className="flex flex-col items-end gap-3"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!canSubmit || createMut.isPending) return
          await actions.onCreate({ parentId: null, content: commentText.trim() })
          resetCommentText()
        }}
      >
        <label className="sr-only" htmlFor={`comment-${postId}`}>
          댓글 입력
        </label>

        <textarea
          id={`comment-${postId}`}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          maxLength={2000}
          className="h-[100px] w-full resize-none rounded-lg bg-[#F9FAFB] px-3 py-2 text-[14px] leading-[20px] text-[#171719] focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none"
          placeholder="댓글을 입력하세요..."
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={commentText.trim().length === 0 || createMut.isPending}
            onClick={() => resetCommentText()}
            className="h-9 rounded-lg px-3 text-[14px] leading-[20px] font-medium text-[#4A5565] disabled:opacity-50"
          >
            취소
          </button>

          <button
            type="submit"
            disabled={!canSubmit || createMut.isPending}
            className="inline-flex h-9 w-[108px] items-center justify-center gap-2 rounded-lg bg-[#155DFC] text-[14px] leading-[20px] font-medium text-white disabled:opacity-50"
          >
            <Send size={16} />
            댓글 작성
          </button>
        </div>
      </form>
    </section>
  )
}

function countAll(nodes: Comment[]): number {
  return nodes.reduce((acc, n) => {
    const self = n.isDeleted ? 0 : 1
    return acc + self + countAll(n.replies ?? [])
  }, 0)
}
