'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Send, X } from 'lucide-react'
import type { Comment } from '../types/Comment.types'
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
} from '../queries/useComment'
import { CommentItem } from './CommentItem'
import { useCommentSectionState } from '../hooks/useCommentSectionState'

type MobileComposerState =
  | { mode: 'create' }
  | { mode: 'reply'; parentId: number; writerName?: string }
  | { mode: 'edit'; commentId: number; writerName?: string; initialText: string }

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

  const totalCount = useMemo(() => countAll(comments.contents), [comments.contents])

  const createMut = useCreateCommentMutation(postId)
  const updateMut = useUpdateCommentMutation(postId)
  const deleteMut = useDeleteCommentMutation(postId)

  const { commentText, setCommentText, resetCommentText, setActions, clearActions } =
    useCommentSectionState(postId)

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

  const mobileInputRef = useRef<HTMLTextAreaElement | null>(null)
  const [composer, setComposer] = useState<MobileComposerState>({ mode: 'create' })
  const [mobileText, setMobileText] = useState('')

  const isMobileSubmitting = createMut.isPending || updateMut.isPending
  const mobileCanSubmit = mobileText.trim().length > 0

  const desktopSubmitLockRef = useRef(false)
  const mobileSubmitLockRef = useRef(false)

  const openMobileCreate = () => {
    setComposer({ mode: 'create' })
    setMobileText('')
    queueMicrotask(() => mobileInputRef.current?.focus())
  }

  const openMobileReply = (parentId: number, writerName?: string) => {
    setComposer({ mode: 'reply', parentId, writerName })
    setMobileText('')
    queueMicrotask(() => mobileInputRef.current?.focus())
  }

  const openMobileEdit = (
    commentId: number,
    writerName: string | undefined,
    initialText: string,
  ) => {
    setComposer({ mode: 'edit', commentId, writerName, initialText })
    setMobileText(initialText ?? '')
    queueMicrotask(() => mobileInputRef.current?.focus())
  }

  const cancelMobileMode = () => {
    setComposer({ mode: 'create' })
    setMobileText('')
  }

  const submitMobile = async () => {
    if (!mobileCanSubmit || isMobileSubmitting) return

    const content = mobileText.trim()

    if (composer.mode === 'edit') {
      await actions.onUpdate({ commentId: composer.commentId, content })
      cancelMobileMode()
      return
    }

    const parentId = composer.mode === 'reply' ? composer.parentId : null
    await actions.onCreate({ parentId, content })
    cancelMobileMode()
  }

  const canSubmitDesktopRoot = commentText.trim().length > 0

  async function submitDesktopRootComment() {
    if (!canSubmitDesktopRoot || createMut.isPending) return
    await actions.onCreate({ parentId: null, content: commentText.trim() })
    resetCommentText()
  }

  const mobileBannerText =
    composer.mode === 'reply'
      ? composer.writerName
        ? `${composer.writerName}님에게 답글`
        : '답글 작성 중'
      : composer.mode === 'edit'
        ? '댓글 수정 중'
        : null

  const mobilePlaceholder =
    composer.mode === 'reply'
      ? '답글을 입력하세요...'
      : composer.mode === 'edit'
        ? '수정 내용을 입력하세요...'
        : '댓글을 입력하세요...'

  const mobileSubmitAria =
    composer.mode === 'reply' ? '답글 작성' : composer.mode === 'edit' ? '댓글 수정' : '댓글 작성'

  return (
    <section aria-label="댓글" className="flex flex-col gap-4 pb-[60px] md:pb-0">
      <h2 className="text-[16px] leading-[24px] font-normal text-[#101828]">댓글 {totalCount}</h2>

      <ol className="flex flex-col gap-6">
        {comments.contents.map((c) => (
          <CommentItem
            key={c.commentId}
            postId={postId}
            comment={c}
            depth={0}
            onMobileReply={(parentId, writerName) => openMobileReply(parentId, writerName)}
            onMobileEdit={(commentId, writerName, initialText) =>
              openMobileEdit(commentId, writerName, initialText)
            }
          />
        ))}
      </ol>

      {/* 데스크탑 댓글 작성 */}
      <form
        className="hidden flex-col items-end gap-3 lg:flex"
        onSubmitCapture={(e) => {
          if (desktopSubmitLockRef.current) {
            e.preventDefault()
            e.stopPropagation()
            return
          }
          desktopSubmitLockRef.current = true
        }}
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            await submitDesktopRootComment()
          } finally {
            desktopSubmitLockRef.current = false
          }
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
            disabled={!canSubmitDesktopRoot || createMut.isPending}
            className="inline-flex h-9 w-[108px] items-center justify-center gap-2 rounded-lg bg-[#155DFC] text-[14px] leading-[20px] font-medium text-white disabled:opacity-50"
          >
            <Send size={16} />
            댓글 작성
          </button>
        </div>
      </form>

      {/* 모바일 댓글 작성 */}
      <form
        className={[
          'fixed inset-x-0 bottom-0 z-30 lg:hidden',
          'border-t border-[#E5E7EB] bg-white',
          'px-4 pt-[17px] pb-[calc(16px+env(safe-area-inset-bottom))]',
        ].join(' ')}
        onSubmitCapture={(e) => {
          if (mobileSubmitLockRef.current) {
            e.preventDefault()
            e.stopPropagation()
            return
          }
          mobileSubmitLockRef.current = true
        }}
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            await submitMobile()
          } finally {
            mobileSubmitLockRef.current = false
          }
        }}
      >
        {mobileBannerText && (
          <div className="mb-2 flex items-center justify-between rounded-[10px] bg-[#F3F4F5] px-3 py-2">
            <p className="text-[14px] leading-[20px] text-[#364153]">{mobileBannerText}</p>
            <button
              type="button"
              onClick={cancelMobileMode}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md"
              aria-label="모드 취소"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <textarea
            ref={mobileInputRef}
            value={mobileText}
            onChange={(e) => setMobileText(e.target.value)}
            maxLength={2000}
            rows={1}
            className={[
              'flex-1 resize-none',
              'h-11',
              'rounded-[8px] bg-[#F3F3F5]',
              'px-3 py-2',
              'text-[16px] leading-[24px] text-[#171719]',
              'focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none',
              'overflow-y-auto',
              isMobileSubmitting ? 'opacity-70' : '',
            ].join(' ')}
            placeholder={mobilePlaceholder}
          />

          <button
            type="submit"
            disabled={!mobileCanSubmit || isMobileSubmitting}
            className={[
              'flex h-9 w-10 items-center justify-center rounded-[8px]',
              mobileCanSubmit && !isMobileSubmitting ? 'bg-[#030213]' : 'bg-[#030213]/50',
              'text-white',
            ].join(' ')}
            aria-label={mobileSubmitAria}
          >
            <Send size={16} />
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
