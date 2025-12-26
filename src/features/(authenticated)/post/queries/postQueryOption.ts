import { getPosts } from '../apis/post.api'
import type { GetPostsResponse } from '../types/Post.types'
import type { TopicType } from '@/types/Topic.types'

export const DEFAULT_POSTS_PAGE_SIZE = 20
export type Cursor = number | null

export const postKeys = {
  all: ['post'] as const,
  listBase: () => [...postKeys.all, 'list'] as const,
  list: (params: { topic?: TopicType; size?: number } = {}) =>
    [
      ...postKeys.listBase(),
      params.topic ?? 'ALL',
      params.size ?? DEFAULT_POSTS_PAGE_SIZE,
    ] as const,
  detail: (postId: number) => [...postKeys.all, 'detail', postId] as const,
}

export function getPostsInfiniteQueryOption(params: { topic?: TopicType; size?: number } = {}) {
  const { topic, size = DEFAULT_POSTS_PAGE_SIZE } = params

  return {
    queryKey: postKeys.list({ topic, size }),
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getPosts({
        topic,
        page: pageParam,
        size,
      }),
    getNextPageParam: (lastPage: GetPostsResponse): Cursor => {
      if (!lastPage.hasNext) return null
      return lastPage.nextPage
    },
  }
}
