import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getPostsInfiniteQueryOption } from '@/features/(authenticated)/post/queries/postQueryOption'
import { PostInfiniteList } from '@/features/(authenticated)/post/components/PostInfiniteList'
import { nqc } from '@/lib/query-client/queryClient'

export default async function TotalPage() {
  const qc = nqc()
  await qc.prefetchInfiniteQuery(getPostsInfiniteQueryOption())

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <PostInfiniteList />
    </HydrationBoundary>
  )
}
