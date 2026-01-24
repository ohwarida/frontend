import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { TOPIC_TYPE } from '@/types/Topic.types'
import { PostInfiniteList } from '@/features/(authenticated)/post/components/PostInfiniteList'
import { getPostsInfiniteQueryOption } from '@/features/(authenticated)/post/queries/postQueryOption'
import { nqc } from '@/lib/query-client/queryClient'

export const metadata: Metadata = {
  title: '지식 | Wanted Ground PotenUp',
  description: '모두의 지식을 공유하는 게시판입니다.',
}

export default async function KnowledgePage() {
  const qc = nqc()

  await qc.prefetchInfiniteQuery(getPostsInfiniteQueryOption({ topic: TOPIC_TYPE.KNOWLEDGE }))

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <PostInfiniteList topic={TOPIC_TYPE.KNOWLEDGE} />
    </HydrationBoundary>
  )
}
