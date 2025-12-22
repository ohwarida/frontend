'use client'

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost, getPosts, updatePost } from '../apis/post.api'
import type { GetPostsResponse, UpdatePostRequest } from '../types/Post.types'

export const postKeys = {
  all: ['post'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  detail: (postId: number) => [...postKeys.all, 'detail', postId] as const,
}

const DEFAULT_POSTS_PAGE_SIZE = 20

// 게시글 전체 조회 (무한 스크롤)
export function useGetPostsQuery(size = DEFAULT_POSTS_PAGE_SIZE) {
  return useInfiniteQuery<GetPostsResponse>({
    queryKey: postKeys.list(),
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        cursorId: typeof pageParam === 'number' ? pageParam : undefined,
        size,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined
      return lastPage.nextCursorId ?? lastPage.contents.at(-1)?.postId ?? undefined
    },
  })
}

// 게시글 수정
export function useUpdatePostMutation() {
  const qc = useQueryClient()

  return useMutation<Awaited<ReturnType<typeof updatePost>>, Error, UpdatePostRequest>({
    mutationFn: (payload) => updatePost(payload),
    onSuccess: (_data, variables) => {
      // 상세 + 목록 갱신
      qc.invalidateQueries({ queryKey: postKeys.detail(variables.postId) })
      qc.invalidateQueries({ queryKey: postKeys.list() })
    },
  })
}

// 게시글 삭제
export function useDeletePostMutation() {
  const qc = useQueryClient()

  return useMutation<Awaited<ReturnType<typeof deletePost>>, Error, number>({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: (_data, postId) => {
      // 상세 캐시 제거 + 목록 갱신
      qc.removeQueries({ queryKey: postKeys.detail(postId) })
      qc.invalidateQueries({ queryKey: postKeys.list() })
    },
  })
}
