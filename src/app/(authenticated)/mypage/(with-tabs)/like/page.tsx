import React from 'react'
import PageTitle from '@/components/ui/PageTitle'
import { Metadata } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { nqc } from '@/lib/query-client/queryClient'
import { MyPostInfiniteList } from '@/features/(authenticated)/mypage/components/MyPostInfiniteList'
import { getMyPostsInfiniteQueryOption } from '@/features/(authenticated)/mypage/queries/getMyPostsInfiniteQueryOption'

export const metadata: Metadata = {
  title: '좋아요 | 마이페이지 | Wanted Ground PotenUp',
  description: '내가 좋아요한 게시글을 확인합니다.',
}

export default async function MyLikePage() {
  const qc = nqc()

  await qc.prefetchInfiniteQuery(getMyPostsInfiniteQueryOption({ topic: 'MY-POST-LIKED' }))

  return (
    <div>
      <PageTitle title="내가 좋아요 한 글" subTitle="커뮤니티에 내가 좋아요 한 글을 보여줍니다." />
      <section className="flex flex-col gap-0 lg:gap-4">
        <HydrationBoundary
          state={dehydrate(qc, {
            shouldDehydrateQuery: (q) => q.state.status === 'success',
          })}
        >
          <MyPostInfiniteList topic="MY-POST-LIKED" />
        </HydrationBoundary>
      </section>
    </div>
  )
}
