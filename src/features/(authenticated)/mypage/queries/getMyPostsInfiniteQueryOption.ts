import { getMyPosts } from '@/features/(authenticated)/mypage/apis/getMyPosts'
import { getMyLikes } from '@/features/(authenticated)/mypage/apis/getMyLike'
import { GetPostsResponse } from '@/features/(authenticated)/post/types/Post.types'
import { DEFAULT_PAGE_SIZE } from '@/constants/pageSize'
import { MyPostTopic } from '@/features/(authenticated)/mypage/types/MyPostsTopic'

export type Cursor = number | null

export const postKeys = {
  all: ['my-post'] as const,
  listBase: () => [...postKeys.all, 'list'] as const,
  list: (params: { topic?: MyPostTopic; size?: number } = {}) =>
    [...postKeys.listBase(), params.topic ?? 'ALL', params.size ?? DEFAULT_PAGE_SIZE] as const,
  detail: (postId: number) => [...postKeys.all, 'detail', postId] as const,
}

export function getMyPostsInfiniteQueryOption(params: { topic?: MyPostTopic; size?: number } = {}) {
  const { topic, size = DEFAULT_PAGE_SIZE } = params

  return {
    queryKey: postKeys.list({ topic, size }),
    initialPageParam: 1,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      // 내 글 목록
      if (topic === 'MY-POST') {
        return getMyPosts({ page: pageParam, size })
      } else {
        return getMyLikes({ page: pageParam, size })
      }
    },
    getNextPageParam: (lastPage: GetPostsResponse): Cursor => {
      if (!lastPage.hasNext) return null
      return lastPage.nextPage
    },
  }
}
