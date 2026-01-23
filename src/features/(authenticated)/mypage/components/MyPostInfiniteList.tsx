'use client'

import { useEffect, useRef } from 'react'
import PostCard from '@/components/PostCard'
import { useGetMyPostsQuery } from '@/features/(authenticated)/mypage/queries/useGetMyPosts'
import { EmptyPost } from '@/features/(authenticated)/post/components/EmptyPost'
import { MyPostTopic } from '@/features/(authenticated)/mypage/types/MyPostsTopic'

export function MyPostInfiniteList({ topic, size = 20 }: { topic: MyPostTopic; size?: number }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } =
    useGetMyPostsQuery(topic, size)

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

  if (isEmpty) return <EmptyPost />

  return (
    <>
      {items.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}

      <div ref={sentinelRef} className="h-px" />

      {isFetchingNextPage && <p className="py-6 text-center">불러오는 중…</p>}

      {!isEmpty && isEnd && !isFetchingNextPage && (
        <p className="py-6 text-center text-sm text-[rgba(55,56,60,0.61)]">마지막 페이지입니다</p>
      )}
    </>
  )
}
