import { getMyComments } from '@/features/(authenticated)/mypage/apis/getMyComment'
import { DEFAULT_PAGE_SIZE } from '@/constants/pageSize'
import type { GetMyCommentsResponse } from '@/features/(authenticated)/mypage/types/getMyCommentsResponse'

export const myCommentKeys = {
  all: ['my-comment'] as const,
  listBase: () => [...myCommentKeys.all, 'list'] as const,
  list: (params: { size?: number } = {}) =>
    [...myCommentKeys.listBase(), params.size ?? DEFAULT_PAGE_SIZE] as const,
}

export function getMyCommentsInfiniteQueryOption(params: { size?: number } = {}) {
  const { size = DEFAULT_PAGE_SIZE } = params

  return {
    queryKey: myCommentKeys.list({ size }),
    initialPageParam: 1,

    queryFn: async ({ pageParam }: { pageParam: number }): Promise<GetMyCommentsResponse> => {
      return getMyComments({
        page: pageParam,
        size,
      })
    },

    getNextPageParam: (lastPage: GetMyCommentsResponse) => {
      if (!lastPage.hasNext) return undefined
      if (typeof lastPage.nextPage !== 'number') return undefined
      return lastPage.nextPage
    },
  }
}
