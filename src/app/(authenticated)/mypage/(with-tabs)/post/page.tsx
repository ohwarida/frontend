import React from 'react'
import PageTitle from '@/components/ui/PageTitle'
import { nqc } from '@/lib/query-client/queryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { MyPostInfiniteList } from '@/features/(authenticated)/mypage/components/MyPostInfiniteList'
import { getMyPostsInfiniteQueryOption } from '@/features/(authenticated)/mypage/queries/getMyPostsInfiniteQueryOption'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '내가 쓴 글 | Wanted Ground PotenUp',
  description: '내가 작성한 게시글을 확인할 수 있는 페이지입니다.',
}

export default async function MyPostPage() {
  const qc = nqc()
  await qc.prefetchInfiniteQuery(getMyPostsInfiniteQueryOption({ topic: 'MY-POST' }))

  return (
    <>
      <PageTitle title="내가 쓴 글" subTitle="커뮤니티에 작성한 글을 보여줍니다." />

      <HydrationBoundary state={dehydrate(qc)}>
        <MyPostInfiniteList topic="MY-POST" />
      </HydrationBoundary>
    </>
  )
}
