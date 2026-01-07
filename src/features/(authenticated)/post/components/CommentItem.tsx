'use client'

import { useRef } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { Heart } from 'lucide-react'
import type { Comment } from '../types/Comment.types'
import { toRelativeTimeLabel } from '@/utils/toRelativeTimeLabel'
import { useCommentItemState } from '../hooks/useCommentItemState'
import { useToggleCommentReactionMutation } from '../queries/useReaction'

export function CommentItem({
  postId,
  comment,
  depth,
  onMobileReply,
  onMobileEdit,
}: {
  postId: number
  comment: Comment
  depth: number
  onMobileReply?: (parentId: number, writerName?: string) => void
  onMobileEdit?: (commentId: number, writerName: string | undefined, initialText: string) => void
}) {
  const toggleReaction = useToggleCommentReactionMutation(postId)

  const {
    actions,
    replyOpen,
    openOnlyReply,
    closeAllReply,
    replyText,
    setReplyText,
    resetReplyText,
    editOpen,
    openOnlyEdit,
    closeAllEdit,
    editText,
    setEditText,
    resetEditText,
  } = useCommentItemState(postId, comment.commentId)

  const replySubmitLockRef = useRef(false)
  const editSubmitLockRef = useRef(false)

  if (!actions) return null

  const { currentUserId, onCreate, onUpdate, onDelete } = actions

  const isMine = Number(comment.author.userId) === Number(currentUserId)
  const isDeleted = comment.isDeleted
  const canDelete = !isDeleted && isMine
  const canEdit = !isDeleted && isMine
  const canReply = !isDeleted

  const canReplyToThis = canReply && depth === 0

  const canSubmitReply = replyText.trim().length > 0
  const canSubmitEdit =
    editText.trim().length > 0 && editText.trim() !== (comment.content ?? '').trim()

  const safeEditOpen = editOpen && !isDeleted
  const safeReplyOpen = replyOpen && !isDeleted

  const hasReplies = (comment.replies?.length ?? 0) > 0

  return (
    <li>
      <article className={`flex gap-4 ${depth === 0 ? 'pb-6' : 'py-2'}`}>
        <Avatar size="xs" />

        <div className="flex w-full flex-col gap-2">
          <header className="flex items-center gap-2">
            <span className="text-[16px] leading-[24px] text-[#171719]">{comment.author.name}</span>
            <span aria-hidden className="text-[16px] leading-[24px] text-[#99A1AF]">
              ·
            </span>
            <time
              className="text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]"
              dateTime={comment.createdAt}
            >
              {toRelativeTimeLabel(comment.createdAt)}
            </time>
          </header>

          {!safeEditOpen ? (
            <p className="text-[16px] leading-[24px] text-[#171719]">
              {isDeleted ? '삭제된 댓글입니다.' : comment.content}
            </p>
          ) : (
            <form
              onSubmitCapture={(e) => {
                if (editSubmitLockRef.current) {
                  e.preventDefault()
                  e.stopPropagation()
                  return
                }
                editSubmitLockRef.current = true
              }}
              onSubmit={async (e) => {
                e.preventDefault()

                if (!canSubmitEdit) {
                  editSubmitLockRef.current = false
                  return
                }

                try {
                  await onUpdate({ commentId: comment.commentId, content: editText.trim() })
                  resetEditText(comment.commentId)
                  closeAllEdit()
                } finally {
                  editSubmitLockRef.current = false
                }
              }}
              className="hidden flex-col gap-2 lg:flex"
            >
              <label className="sr-only" htmlFor={`edit-${comment.commentId}`}>
                댓글 수정
              </label>
              <textarea
                id={`edit-${comment.commentId}`}
                value={editText}
                onChange={(e) => setEditText(comment.commentId, e.target.value)}
                maxLength={2000}
                className="h-20 w-full resize-none rounded-lg bg-[#F9FAFB] px-3 py-2 text-[14px] leading-[20px] text-[#171719] focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="h-8 rounded-lg px-3 text-[14px] leading-[20px] font-medium text-[#4A5565]"
                  onClick={() => {
                    resetEditText(comment.commentId)
                    closeAllEdit()
                    editSubmitLockRef.current = false
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!canSubmitEdit || editSubmitLockRef.current}
                  className="h-8 rounded-lg bg-[#155DFC] px-4 text-[14px] leading-[20px] font-medium text-white disabled:opacity-50"
                >
                  수정하기
                </button>
              </div>
            </form>
          )}

          {!isDeleted && (
            <>
              {/* 모바일 액션 */}
              <div className="flex items-center gap-4 text-[15px] leading-[22px] text-[#6A7282] lg:hidden">
                <button
                  type="button"
                  className="inline-flex items-center gap-1"
                  aria-label={`좋아요 ${comment.commentReactionStats.totalCount}개`}
                  disabled={toggleReaction.isPending}
                  onClick={() =>
                    toggleReaction.mutate({
                      commentId: comment.commentId,
                      prevReacted:
                        comment.commentReactionStats.summaries.LIKE?.reactedByMe ?? false,
                    })
                  }
                >
                  <Heart
                    size={16}
                    stroke={
                      comment.commentReactionStats.summaries.LIKE?.reactedByMe
                        ? '#E7000B'
                        : 'currentColor'
                    }
                    fill={
                      comment.commentReactionStats.summaries.LIKE?.reactedByMe ? '#E7000B' : 'none'
                    }
                  />
                  <span>{comment.commentReactionStats.summaries.LIKE?.count ?? 0}</span>
                </button>

                {canReplyToThis && (
                  <button
                    type="button"
                    onClick={() => onMobileReply?.(comment.commentId, comment.author.name)}
                  >
                    답글
                  </button>
                )}

                {canEdit && (
                  <button
                    type="button"
                    onClick={() =>
                      onMobileEdit?.(comment.commentId, comment.author.name, comment.content ?? '')
                    }
                  >
                    수정
                  </button>
                )}

                {canDelete && (
                  <button
                    type="button"
                    onClick={() => {
                      const ok = window.confirm('댓글을 삭제할까요?')
                      if (!ok) return
                      onDelete(comment.commentId)
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>

              {/* 데스크탑 액션 */}
              <div className="hidden items-center gap-4 text-[15px] leading-[22px] text-[#6A7282] lg:flex">
                <button
                  type="button"
                  className="inline-flex items-center gap-1"
                  aria-label={`좋아요 ${comment.commentReactionStats.totalCount}개`}
                  disabled={toggleReaction.isPending}
                  onClick={() =>
                    toggleReaction.mutate({
                      commentId: comment.commentId,
                      prevReacted:
                        comment.commentReactionStats.summaries.LIKE?.reactedByMe ?? false,
                    })
                  }
                >
                  <Heart
                    size={16}
                    stroke={
                      comment.commentReactionStats.summaries.LIKE?.reactedByMe
                        ? '#E7000B'
                        : 'currentColor'
                    }
                    fill={
                      comment.commentReactionStats.summaries.LIKE?.reactedByMe ? '#E7000B' : 'none'
                    }
                  />
                  <span>{comment.commentReactionStats.summaries.LIKE?.count ?? 0}</span>
                </button>

                {canReplyToThis && (
                  <button
                    type="button"
                    onClick={() => {
                      if (replyOpen) {
                        resetReplyText(comment.commentId)
                        closeAllReply()
                        replySubmitLockRef.current = false
                        return
                      }
                      openOnlyReply(comment.commentId)
                    }}
                  >
                    답글
                  </button>
                )}

                {canEdit && !safeEditOpen && (
                  <button
                    type="button"
                    onClick={() => {
                      if (editOpen) {
                        resetEditText(comment.commentId)
                        closeAllEdit()
                        editSubmitLockRef.current = false
                        return
                      }
                      setEditText(comment.commentId, comment.content ?? '')
                      openOnlyEdit(comment.commentId)
                    }}
                  >
                    수정
                  </button>
                )}

                {canDelete && (
                  <button
                    type="button"
                    onClick={() => {
                      const ok = window.confirm('댓글을 삭제할까요?')
                      if (!ok) return
                      onDelete(comment.commentId)
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>
            </>
          )}

          {(hasReplies || safeReplyOpen) && (
            <div className="mt-2 flex flex-col gap-4 border-l-0 pl-0 lg:border-l lg:border-[#F4F4F5] lg:pl-4">
              {hasReplies && (
                <ol className="flex flex-col gap-4">
                  {(comment.replies ?? []).map((r) => (
                    <CommentItem
                      key={r.commentId}
                      postId={postId}
                      comment={r}
                      depth={depth + 1}
                      onMobileReply={onMobileReply}
                      onMobileEdit={onMobileEdit}
                    />
                  ))}
                </ol>
              )}

              {!isDeleted && canReplyToThis && safeReplyOpen && (
                <form
                  className="hidden pt-2 lg:block"
                  onSubmitCapture={(e) => {
                    if (replySubmitLockRef.current) {
                      e.preventDefault()
                      e.stopPropagation()
                      return
                    }
                    replySubmitLockRef.current = true
                  }}
                  onSubmit={async (e) => {
                    e.preventDefault()

                    if (!canSubmitReply) {
                      replySubmitLockRef.current = false
                      return
                    }

                    try {
                      await onCreate({ parentId: comment.commentId, content: replyText.trim() })
                      resetReplyText(comment.commentId)
                      closeAllReply()
                    } finally {
                      replySubmitLockRef.current = false
                    }
                  }}
                >
                  <label className="sr-only" htmlFor={`reply-${comment.commentId}`}>
                    답글 입력
                  </label>
                  <textarea
                    id={`reply-${comment.commentId}`}
                    value={replyText}
                    onChange={(e) => setReplyText(comment.commentId, e.target.value)}
                    maxLength={2000}
                    placeholder="답글을 입력하세요..."
                    className="h-20 w-full resize-none rounded-lg bg-[#F9FAFB] px-3 py-2 text-[14px] leading-[20px] text-[#171719] placeholder:text-[#717182] focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none"
                  />

                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      className="h-8 rounded-lg px-3 text-[14px] leading-[20px] font-medium text-[#4A5565]"
                      onClick={() => {
                        resetReplyText(comment.commentId)
                        closeAllReply()
                        replySubmitLockRef.current = false
                      }}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmitReply || replySubmitLockRef.current}
                      className="h-8 rounded-lg bg-[#155DFC] px-4 text-[14px] leading-[20px] font-medium text-white disabled:opacity-50"
                    >
                      답글 작성
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </article>
    </li>
  )
}
