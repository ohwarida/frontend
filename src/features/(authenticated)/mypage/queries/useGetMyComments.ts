import { useInfiniteQuery } from '@tanstack/react-query'
import { getMyCommentsInfiniteQueryOption } from '@/features/(authenticated)/mypage/queries/getMyCommentsQueryOption'
import { DEFAULT_PAGE_SIZE } from '@/constants/pageSize'

export function useGetMyCommentsQuery(size: number = DEFAULT_PAGE_SIZE) {
  return useInfiniteQuery(getMyCommentsInfiniteQueryOption({ size }))
}
