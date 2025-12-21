'use client'

import { useShallow } from 'zustand/react/shallow'
import { useCommentStore } from '../stores/comment.store'

export const useCommentItemState = (postId: number, commentId: number) => {
  return useCommentStore(
    useShallow((s) => ({
      actions: s.actionsByPostId[postId],

      replyOpen: s.replyOpenByCommentId[commentId] ?? false,
      openOnlyReply: s.openOnlyReply,
      closeAllReply: s.closeAllReply,

      replyText: s.replyTextByCommentId[commentId] ?? '',
      setReplyText: s.setReplyText,
      resetReplyText: s.resetReplyText,

      editOpen: s.editOpenByCommentId[commentId] ?? false,
      openOnlyEdit: s.openOnlyEdit,
      closeAllEdit: s.closeAllEdit,

      editText: s.editTextByCommentId[commentId] ?? '',
      setEditText: s.setEditText,
      resetEditText: s.resetEditText,
    })),
  )
}
