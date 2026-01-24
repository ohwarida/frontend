'use client'

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost, updatePost } from '../apis/post.api'
import type { UpdatePostRequest } from '../types/Post.types'
import { TopicType } from '@/types/Topic.types'
import { getPostsInfiniteQueryOption, postKeys } from './postQueryOption'
import { DEFAULT_PAGE_SIZE } from '@/constants/pageSize'

// 게시글 전체 조회 (무한 스크롤)
export function useGetPostsQuery(topic?: TopicType, size: number = DEFAULT_PAGE_SIZE) {
  return useInfiniteQuery(getPostsInfiniteQueryOption({ topic, size }))
}

// 게시글 수정
export function useUpdatePostMutation() {
  const qc = useQueryClient()
  return useMutation<Awaited<ReturnType<typeof updatePost>>, Error, UpdatePostRequest>({
    mutationFn: (payload) => updatePost(payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: postKeys.detail(variables.postId) })
      qc.invalidateQueries({ queryKey: postKeys.listBase() })
    },
  })
}

// 게시글 삭제
export function useDeletePostMutation() {
  const qc = useQueryClient()
  return useMutation<Awaited<ReturnType<typeof deletePost>>, Error, number>({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: (_data, postId) => {
      qc.removeQueries({ queryKey: postKeys.detail(postId) })
      qc.invalidateQueries({ queryKey: postKeys.listBase() })
    },
  })
}
