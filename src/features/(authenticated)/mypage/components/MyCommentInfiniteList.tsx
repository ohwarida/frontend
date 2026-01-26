'use client'

import { useEffect, useRef } from 'react'
import { EmptyMyComment } from '@/features/(authenticated)/mypage/components/EmptyMyComment'
import { CommentCard } from '@/components/CommentCard'
import { useGetMyCommentsQuery } from '@/features/(authenticated)/mypage/queries/useGetMyComments'

export function MyCommentInfiniteList({ size = 20 }: { size?: number }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetMyCommentsQuery(size)

  const items = data?.pages.flatMap((p) => p.contents) ?? []
  const isEmpty = items.length === 0
  const isEnd = !hasNextPage
  const isInitialLoading = status === 'pending' && isEmpty

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        if (!hasNextPage) return
        if (isFetchingNextPage) return

        fetchNextPage()
      },
      { rootMargin: '200px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isInitialLoading) return <p className="py-6 text-center">불러오는 중…</p>
  // if (status === 'error')
  //   return <p className="py-6 text-center">에러: {(error as Error).message}</p>

  if (isEmpty) return <EmptyMyComment />

  return (
    <div
      className={['flex flex-col gap-2 px-4 pt-2 pb-24', 'lg:gap-4 lg:px-0 lg:pt-0 lg:pb-0'].join(
        ' ',
      )}
    >
      {items.map((comment) => (
        <CommentCard key={comment.commentId} comment={comment} />
      ))}

      <div ref={sentinelRef} className="h-px" />

      {isFetchingNextPage && <p className="py-6 text-center">불러오는 중…</p>}

      {!isEmpty && isEnd && !isFetchingNextPage && (
        <p className="py-6 text-center text-sm text-[rgba(55,56,60,0.61)]">마지막 페이지입니다</p>
      )}
    </div>
  )
}
