import { useInfiniteQuery } from '@tanstack/react-query'
import { DEFAULT_PAGE_SIZE } from '@/constants/pageSize'
import { getMyPostsInfiniteQueryOption } from '@/features/(authenticated)/mypage/queries/getMyPostsInfiniteQueryOption'
import { MyPostTopic } from '@/features/(authenticated)/mypage/types/MyPostsTopic'

export function useGetMyPostsQuery(topic: MyPostTopic, size: number = DEFAULT_PAGE_SIZE) {
  return useInfiniteQuery(getMyPostsInfiniteQueryOption({ topic, size }))
}
