'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { Comment } from '@/features/(authenticated)/mypage/types/getMyCommentsResponse'
import { formatDateDot } from '@/utils/formatDateDot'
import { renderMentionText } from '@/utils/renderMentionText'

type CommentCardProps = {
  comment: Comment
  isActive?: boolean
}

export function CommentCard({ comment, isActive = false }: CommentCardProps) {
  const createdAtLabel = formatDateDot(comment?.createdAt ?? '')

  const repliesCount = typeof comment.replies?.length === 'number' ? comment.replies.length : null
  const likeCount =
    typeof comment.commentReactionStats?.totalCount === 'number'
      ? comment.commentReactionStats.totalCount
      : 0

  return (
    <Link
      href={`/post/${comment.postId}#comment-${comment.commentId}`}
      className={clsx(
        'block w-full',
        'rounded-[12px] border border-[#F3F4F6] bg-white',
        'px-[21px] pt-[21px] pb-[21px]',
        'transition-colors',
        !isActive &&
          '[@media(hover:hover)]:hover:border-[#155DFC] [@media(hover:hover)]:hover:bg-blue-50/20',
        !isActive && 'active:border-[#155DFC] active:bg-blue-50/20',
        !isActive &&
          'focus-visible:border-[#155DFC] focus-visible:bg-blue-50/20 focus-visible:outline-none',
        'lg:flex lg:h-[82px] lg:items-center lg:justify-between',
        'lg:rounded-[10px] lg:px-4 lg:py-0',
        isActive ? 'lg:border-2 lg:border-[#155DFC]' : 'lg:border lg:border-[#E5E7EB]',
      )}
    >
      {/* 모바일: 좋아요 · 시간 + 본문 */}
      <div className="flex flex-col gap-2 lg:hidden">
        <div className="flex items-center gap-2 text-[14px] leading-[20px] text-[#989BA2]">
          <span className="font-medium">좋아요 {likeCount}</span>
          <span className="text-[#99A1AF]">·</span>
          <span className="font-normal">{createdAtLabel}</span>
        </div>

        <p className="line-clamp-2 text-[16px] leading-[24px] text-[#1E2939]">
          {renderMentionText(comment.content)}
        </p>
      </div>

      {/* 데스크탑: 기존 구조 */}
      <div className="hidden min-w-0 lg:block">
        <p className="truncate text-[16px] leading-[24px] font-medium text-[#000000]">
          {renderMentionText(comment.content)}
        </p>
        <p className="mt-1 text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]">{createdAtLabel}</p>
      </div>

      {/* 데스크탑: 우측 메타 */}
      <div className="hidden shrink-0 items-center gap-4 text-[14px] leading-[20px] text-[#171719] lg:flex">
        {repliesCount !== null && <span>대댓글 {repliesCount}</span>}
        <span>좋아요 {likeCount}</span>
      </div>
    </Link>
  )
}
