import type { Metadata } from 'next'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { TOPIC_TYPE } from '@/types/Topic.types'
import { PostInfiniteList } from '@/features/(authenticated)/post/components/PostInfiniteList'
import { getPostsInfiniteQueryOption } from '@/features/(authenticated)/post/queries/postQueryOption'

export const metadata: Metadata = {
  title: '지식 | Wanted Ground PotenUp',
  description: '모두의 지식을 공유하는 게시판입니다.',
}

export default async function KnowledgePage() {
  const qc = new QueryClient()

  await qc.prefetchInfiniteQuery(getPostsInfiniteQueryOption({ topic: TOPIC_TYPE.KNOWLEDGE }))

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <PostInfiniteList topic={TOPIC_TYPE.KNOWLEDGE} />
    </HydrationBoundary>
  )
}
