import { getPosts } from '../apis/post.api'
import type { GetPostsResponse } from '../types/Post.types'
import type { TopicType } from '@/types/Topic.types'
import { DEFAULT_PAGE_SIZE } from '@/constants/pageSize'

export type Cursor = number | null

export const postKeys = {
  all: ['post'] as const,
  listBase: () => [...postKeys.all, 'list'] as const,
  list: (params: { topic?: TopicType; size?: number } = {}) =>
    [...postKeys.listBase(), params.topic ?? 'ALL', params.size ?? DEFAULT_PAGE_SIZE] as const,
  detail: (postId: number) => [...postKeys.all, 'detail', postId] as const,
}

export function getPostsInfiniteQueryOption(params: { topic?: TopicType; size?: number } = {}) {
  const { topic, size = DEFAULT_PAGE_SIZE } = params

  return {
    queryKey: postKeys.list({ topic, size }),
    initialPageParam: 1,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      return getPosts({
        topic,
        page: pageParam,
        size,
      })
    },
    getNextPageParam: (lastPage: GetPostsResponse): Cursor => {
      if (!lastPage.hasNext) return null
      return lastPage.nextPage
    },
  }
}
