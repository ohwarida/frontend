import React from 'react'
import PageTitle from '@/components/ui/PageTitle'
import { Metadata } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { nqc } from '@/lib/query-client/queryClient'
import { MyCommentInfiniteList } from '@/features/(authenticated)/mypage/components/MyCommentInfiniteList'
import { getMyCommentsInfiniteQueryOption } from '@/features/(authenticated)/mypage/queries/getMyCommentsQueryOption'

export const metadata: Metadata = {
  title: '내 댓글 | 마이페이지 | Wanted Ground PotenUp',
  description: '내가 작성한 댓글을 확인하고 관리합니다.',
}

export default async function MyCommentPage() {
  const qc = nqc()

  await qc.prefetchInfiniteQuery(getMyCommentsInfiniteQueryOption())
  return (
    <div>
      <PageTitle
        title="내가 쓴 댓글"
        subTitle="여러분의 활발한 소통이 우리 커뮤니티를 더욱 즐거운 공간으로 만듭니다."
      />
      <section className="flex flex-col gap-0 lg:gap-4">
        <HydrationBoundary
          state={dehydrate(qc, {
            shouldDehydrateQuery: (q) => q.state.status === 'success',
          })}
        >
          <MyCommentInfiniteList />
        </HydrationBoundary>
      </section>
    </div>
  )
}
