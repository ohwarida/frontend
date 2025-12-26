import type { Metadata } from 'next'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { TOPIC_TYPE } from '@/types/Topic.types'
import { PostInfiniteList } from '@/features/(authenticated)/post/components/PostInfiniteList'
import { getPostsInfiniteQueryOption } from '@/features/(authenticated)/post/queries/postQueryOption'

export const metadata: Metadata = {
  title: '취업 팁 | Wanted Ground PotenUp',
  description: '취업에 도움이 되는 팁과 노하우를 공유하고 확인할 수 있는 게시판입니다.',
}

export default async function JobTipsPage() {
  const qc = new QueryClient()

  await qc.prefetchInfiniteQuery(getPostsInfiniteQueryOption({ topic: TOPIC_TYPE.EMPLOYMENT_TIP }))

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <PostInfiniteList topic={TOPIC_TYPE.EMPLOYMENT_TIP} />
    </HydrationBoundary>
  )
}
