'use client'

import { Avatar } from '@/components/ui/Avatar'
import { Heart } from 'lucide-react'
import type { Comment } from '../types/Comment.types'
import { toRelativeTimeLabel } from '@/utils/toRelativeTimeLabel'
import { useCommentItemState } from '../hooks/useCommentItemState'

export function CommentItem({
  postId,
  comment,
  depth,
}: {
  postId: number
  comment: Comment
  depth: number
}) {
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
  if (!actions) return null // ready gate랑 중복 안전장치

  const { currentUserId, onCreate, onUpdate, onDelete } = actions

  // 여기서부터 currentUserId 사용
  const isMine = Number(comment.author.userId) === Number(currentUserId)
  const isDeleted = comment.isDeleted
  const canDelete = !isDeleted && isMine
  const canEdit = !isDeleted && isMine
  const canReply = !isDeleted

  // 답글은 "댓글(=depth 0)" 에만 가능 (대댓글에는 답글 버튼이 보이면 안 됨)
  // NOTE: 정책 바뀌면 depth 조건만 수정하면 됨
  const canReplyToThis = canReply && depth === 0

  const canSubmitReply = replyText.trim().length > 0
  const canSubmitEdit =
    editText.trim().length > 0 && editText.trim() !== (comment.content ?? '').trim()

  // 삭제된 댓글은 답글/수정 폼이 열려도 의미 없어서 강제로 닫아버리는 게 UX상 안전
  const safeEditOpen = editOpen && !isDeleted
  const safeReplyOpen = replyOpen && !isDeleted

  // 부모가 삭제돼도 replies는 보이게
  const hasReplies = comment.replies.length > 0
  const showThread = hasReplies || safeReplyOpen

  return (
    <li>
      <article className={`flex gap-4 ${depth === 0 ? 'pb-6' : 'py-2'}`}>
        <Avatar size="sm" />

        <div className="flex w-full flex-col gap-2">
          <header className="flex items-center gap-2">
            {/* NOTE: 정책에 따라 삭제된 댓글의 작성자 표시 여부도 선택 가능 */}
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

          {/* 본문/수정폼 */}
          {!safeEditOpen ? (
            <p className="text-[16px] leading-[24px] text-[#171719]">
              {/* TODO: 부모 댓글 삭제 시, 정책(UX) 선택
                1. 삭제된 댓글은 “완전히 숨김” (댓글/대댓글 모두 안 보이게)
                2. 부모가 삭제돼도 “대댓글은 보이게”
                3. 삭제된 댓글은 본문도 숨기고, “삭제됨” 문구도 없애기
              */}
              {/* 현재 선택: 2번(B안) + 부모는 '삭제된 댓글입니다.' 로 표시 */}
              {isDeleted ? '삭제된 댓글입니다.' : comment.content}
            </p>
          ) : (
            // 삭제된 댓글은 editOpen이어도 safeEditOpen에서 막히므로 여기로 들어오지 않음
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!canSubmitEdit) return
                await onUpdate({ commentId: comment.commentId, content: editText.trim() })
                resetEditText(comment.commentId)
                // NOTE: 저장 후엔 수정 폼 닫기 (단일 오픈 정책)
                closeAllEdit()
              }}
              className="flex flex-col gap-2"
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
                    // NOTE: 취소 시 입력 초기화 + 수정 폼 닫기 (단일 오픈 정책)
                    resetEditText(comment.commentId)
                    closeAllEdit()
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!canSubmitEdit}
                  className="h-8 rounded-lg bg-[#155DFC] px-4 text-[14px] leading-[20px] font-medium text-white disabled:opacity-50"
                >
                  수정하기
                </button>
              </div>
            </form>
          )}

          {/* 액션 */}
          {!isDeleted && (
            <div className="flex items-center gap-4 text-[15px] leading-[22px] text-[#6A7282]">
              <button
                type="button"
                className="inline-flex items-center gap-1"
                aria-label={`좋아요 ${comment.likeCount}개`}
              >
                <Heart size={16} stroke="currentColor" />
                <span>{comment.likeCount}</span>
              </button>

              {/* 답글은 댓글(=depth 0)에만 보이게 */}
              {canReplyToThis && (
                <button
                  type="button"
                  onClick={() => {
                    /**
                     * NOTE: 답글 폼 UX
                     * - 답글 폼은 한 번에 1개만 열리게
                     * - 같은 버튼을 다시 누르면 닫히게(토글)
                     * - 열릴 때는 수정 폼은 닫힘(store에서 처리)
                     */
                    if (replyOpen) {
                      resetReplyText(comment.commentId)
                      closeAllReply()
                      // (선택) 아래처럼 특정 id만 닫고 싶으면 setReplyOpen 사용해도 됨
                      // setReplyOpen(comment.commentId, false)
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
                    /**
                     * NOTE: 수정 폼 UX
                     * - 수정 폼은 한 번에 1개만 열리게
                     * - 같은 버튼을 다시 누르면 닫히게(토글)
                     * - 열릴 때는 답글 폼은 닫힘(store에서 처리)
                     */
                    if (editOpen) {
                      resetEditText(comment.commentId)
                      closeAllEdit()
                      // (선택) setEditOpen(comment.commentId, false)
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
          )}

          {/* replies + reply form */}
          {showThread && (
            <div className="mt-2 flex flex-col gap-4 border-l border-[#F4F4F5] pl-4">
              {hasReplies && (
                <ol className="flex flex-col gap-4">
                  {comment.replies.map((r) => (
                    <CommentItem key={r.commentId} postId={postId} comment={r} depth={depth + 1} />
                  ))}
                </ol>
              )}

              {/* 삭제된 부모에는 답글 작성 폼을 열지 않음 */}
              {/* 답글 작성 폼은 "댓글(=depth 0)" + "답글 버튼으로 열렸을 때(replyOpen)"에만 보이게 */}
              {/* NOTE: 대댓글에는 답글 버튼/폼이 보이면 안 됨 → canReplyToThis가 depth===0 조건 */}
              {!isDeleted && canReplyToThis && safeReplyOpen && (
                <form
                  className="pt-2"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    if (!canSubmitReply) return
                    await onCreate({ parentId: comment.commentId, content: replyText.trim() })
                    resetReplyText(comment.commentId)
                    // NOTE: 작성 후엔 답글 폼 닫기 (단일 오픈 정책)
                    closeAllReply()
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
                        // NOTE: 취소 시 입력값 초기화 + 폼 닫기 (단일 오픈 정책)
                        resetReplyText(comment.commentId)
                        closeAllReply()
                        // (선택) 특정 id만 닫고 싶으면 setReplyOpen 사용해도 됨
                        // setReplyOpen(comment.commentId, false)
                      }}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmitReply}
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
