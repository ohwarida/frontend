import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getPostsInfiniteQueryOption } from '@/features/(authenticated)/post/queries/postQueryOption'
import { PostInfiniteList } from '@/features/(authenticated)/post/components/PostInfiniteList'

export default async function TotalPage() {
  const qc = new QueryClient()
  await qc.prefetchInfiniteQuery(getPostsInfiniteQueryOption())

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <PostInfiniteList />
    </HydrationBoundary>
  )
}
