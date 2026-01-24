'use client'

import React from 'react'
import clsx from 'clsx'
import { Comment } from '@/features/(authenticated)/mypage/types/getMyCommentsResponse'
import Link from 'next/link'
import { toRelativeTimeLabel } from '@/utils/toRelativeTimeLabel'
import { RelativeTime } from '@/components/RelativeTime'

export default function CommentCard({ comment }: { comment: Comment }) {
  const createdAt = comment?.createdAt ?? ''
  const createdAtLabel = createdAt ? toRelativeTimeLabel(createdAt) : ''

  return (
    <Link
      href={`/post/${comment.postId}`}
      className={clsx(
        'block w-full border-b border-[rgba(0,0,0,0.06)] bg-white p-3',
        'md:box-border md:max-w-[1045px] md:overflow-hidden md:rounded-[8px] md:border-b-0 md:bg-white',
        'relative hover:bg-blue-50',
      )}
    >
      <article className="flex flex-col gap-1">
        <p className="font-medium">{comment.content}</p>
        <RelativeTime
          dateTime={createdAt}
          initialLabel={createdAtLabel}
          className="text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]"
        />
      </article>
      <div className="absolute inset-y-0 right-4 flex items-center gap-3 text-xs">
        <p>
          {typeof comment.replies?.length === 'number' ? `대댓글 수 ${comment.replies.length}` : ''}
        </p>
        {typeof comment.commentReactionStats?.totalCount === 'number'
          ? `좋아요 ${comment.commentReactionStats.totalCount}`
          : ''}
      </div>
    </Link>
  )
}
