import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getPostsInfiniteQueryOption } from '@/features/(authenticated)/post/queries/postQueryOption'
import { TOPIC_TYPE } from '@/types/Topic.types'
import { PostInfiniteList } from '@/features/(authenticated)/post/components/PostInfiniteList'
import { nqc } from '@/lib/query-client/queryClient'

export const metadata: Metadata = {
  title: '잡담 | Wanted Ground PotenUp',
  description: '편하게 잡담하고 질문·근황·소소한 이야기를 나누는 자유 게시판입니다.',
}

export default async function SmallTalkPage() {
  const qc = nqc()

  await qc.prefetchInfiniteQuery(getPostsInfiniteQueryOption({ topic: TOPIC_TYPE.SMALL_TALK }))

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <PostInfiniteList topic={TOPIC_TYPE.SMALL_TALK} />
    </HydrationBoundary>
  )
}
