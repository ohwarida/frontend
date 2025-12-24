'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleReactionAction } from '../actions/toggleReactionAction'
import type { GetCommentsResponse, Comment } from '../types/Comment.types'

export const commentsKey = (postId: number) => ['comment', postId] as const

type ToggleLikeVars = {
  commentId: number
  prevReacted: boolean // 클릭 직전 값
}

export function useToggleCommentReactionMutation(postId: number) {
  const qc = useQueryClient()
  const key = commentsKey(postId)

  return useMutation({
    mutationFn: ({ commentId, prevReacted }: ToggleLikeVars) =>
      toggleReactionAction({
        targetType: 'COMMENT',
        targetId: commentId,
        reactionType: 'LIKE',
        reactedByMe: prevReacted, // 서버에는 직전 값 전달
        revalidatePathname: `/post/${postId}`,
      }),

    onMutate: async ({ commentId, prevReacted }) => {
      await qc.cancelQueries({ queryKey: key })
      const prev = qc.getQueryData<GetCommentsResponse>(key)

      if (prev) {
        qc.setQueryData<GetCommentsResponse>(key, {
          ...prev,
          contents: mapCommentTree(prev.contents ?? [], commentId, (c) =>
            applyLikeOptimistic(c, prevReacted),
          ),
        })
      }

      return { prev }
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev)
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: key })
    },
  })
}

function applyLikeOptimistic(c: Comment, prevReacted: boolean): Comment {
  const nextReacted = !prevReacted

  const prevCount = c.commentReactionStats?.summaries?.LIKE?.count ?? 0
  const nextCount = Math.max(0, prevCount + (nextReacted ? 1 : -1))

  const prevTotal = c.commentReactionStats?.totalCount ?? 0
  const nextTotal = Math.max(0, prevTotal + (nextReacted ? 1 : -1))

  return {
    ...c,
    commentReactionStats: {
      ...(c.commentReactionStats ?? { commentId: c.commentId }),
      commentId: c.commentId,
      totalCount: nextTotal,
      summaries: {
        ...(c.commentReactionStats?.summaries ?? {}),
        LIKE: { count: nextCount, reactedByMe: nextReacted },
      },
    },
  }
}

function mapCommentTree(
  nodes: Comment[],
  targetId: number,
  map: (c: Comment) => Comment,
): Comment[] {
  return nodes.map((n) => {
    if (n.commentId === targetId) return map(n)
    if (n.replies?.length) return { ...n, replies: mapCommentTree(n.replies, targetId, map) }
    return n
  })
}
