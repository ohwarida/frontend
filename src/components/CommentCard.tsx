'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { Comment } from '@/features/(authenticated)/mypage/types/getMyCommentsResponse'
import { formatDateDot } from '@/utils/formatDateDot'

type CommentCardProps = {
  comment: Comment
  isActive?: boolean
}

export default function CommentCard({ comment, isActive = false }: CommentCardProps) {
  const createdAt = comment?.createdAt ?? ''
  const createdAtLabel = formatDateDot(createdAt)

  const repliesCount = typeof comment.replies?.length === 'number' ? comment.replies.length : null
  const likeCount =
    typeof comment.commentReactionStats?.totalCount === 'number'
      ? comment.commentReactionStats.totalCount
      : null

  return (
    <Link
      href={`/post/${comment.postId}`}
      className={clsx(
        'flex w-full items-center justify-between',
        'h-[82px] px-4',
        'rounded-[10px] bg-white',
        isActive ? 'border-2 border-[#155DFC]' : 'border border-[#E5E7EB]',
        isActive ? '' : 'hover:border-[#155DFC] hover:bg-blue-50/20',
        'md:max-w-[1045px]',
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-[16px] leading-[24px] font-medium text-[#000000]">
          {comment.content}
        </p>

        <p className="mt-1 text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]">
          {createdAtLabel}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4 text-[14px] leading-[20px] text-[#171719]">
        {repliesCount !== null && <span>대댓글 {repliesCount}</span>}
        {likeCount !== null && <span>좋아요 {likeCount}</span>}
      </div>
    </Link>
  )
}
