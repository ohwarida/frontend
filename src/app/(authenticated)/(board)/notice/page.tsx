import type { Metadata } from 'next'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { TOPIC_TYPE } from '@/types/Topic.types'
import { PostInfiniteList } from '@/features/(authenticated)/post/components/PostInfiniteList'
import { getPostsInfiniteQueryOption } from '@/features/(authenticated)/post/queries/postQueryOption'

export const metadata: Metadata = {
  title: '공지사항 | Wanted Ground PotenUp',
  description: '서비스 운영 및 업데이트 관련 공지사항을 확인할 수 있는 게시판입니다.',
}

export default async function NoticePage() {
  const qc = new QueryClient()

  await qc.prefetchInfiniteQuery(getPostsInfiniteQueryOption({ topic: TOPIC_TYPE.NOTICE }))

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <PostInfiniteList topic={TOPIC_TYPE.NOTICE} />
    </HydrationBoundary>
  )
}
