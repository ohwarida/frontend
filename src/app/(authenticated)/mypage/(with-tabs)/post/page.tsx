import React from 'react'
import PageTitle from '@/components/ui/PageTitle'
import { nqc } from '@/lib/query-client/queryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { MyPostInfiniteList } from '@/features/(authenticated)/mypage/components/MyPostInfiniteList'
import { getMyPostsInfiniteQueryOption } from '@/features/(authenticated)/mypage/queries/getMyPostsInfiniteQueryOption'

export default async function MyPostPage() {
  const qc = nqc()
  await qc.prefetchInfiniteQuery(getMyPostsInfiniteQueryOption({ topic: 'MY-POST' }))

  return (
    <>
      <PageTitle title="내가 쓴 글" subTitle="커뮤니티에 작성한 글을 보여줍니다." />

      <HydrationBoundary
        state={dehydrate(qc, {
          shouldDehydrateQuery: (q) => q.state.status === 'success',
        })}
      >
        <MyPostInfiniteList topic="MY-POST" />
      </HydrationBoundary>
    </>
  )
}
