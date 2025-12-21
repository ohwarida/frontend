'use client'

import { useCallback } from 'react'
import { useCommentStore } from '../stores/comment.store'

export const useCommentSectionState = (postId: number) => {
  const commentText = useCommentStore((s) => s.commentTextByPostId[postId] ?? '')

  const setCommentTextBase = useCommentStore((s) => s.setCommentText)
  const resetCommentTextBase = useCommentStore((s) => s.resetCommentText)
  const setActionsBase = useCommentStore((s) => s.setActions)
  const clearActionsBase = useCommentStore((s) => s.clearActions)

  const setCommentText = useCallback(
    (text: string) => setCommentTextBase(postId, text),
    [setCommentTextBase, postId],
  )

  const resetCommentText = useCallback(
    () => resetCommentTextBase(postId),
    [resetCommentTextBase, postId],
  )

  const setActions = useCallback(
    (actions: Parameters<typeof setActionsBase>[1]) => setActionsBase(postId, actions),
    [setActionsBase, postId],
  )

  const clearActions = useCallback(() => clearActionsBase(postId), [clearActionsBase, postId])

  return { commentText, setCommentText, resetCommentText, setActions, clearActions }
}
