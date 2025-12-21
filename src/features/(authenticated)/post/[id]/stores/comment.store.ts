'use client'

import { create } from 'zustand'

export type CommentsActions = {
  postId: number
  currentUserId: number
  onCreate: (input: { parentId: number | null; content: string }) => Promise<unknown>
  onUpdate: (input: { commentId: number; content: string }) => Promise<unknown>
  onDelete: (commentId: number) => Promise<unknown>
}

type CommentsUiState = {
  commentTextByPostId: Record<number, string>
  setCommentText: (postId: number, text: string) => void
  resetCommentText: (postId: number) => void

  replyOpenByCommentId: Record<number, boolean>
  toggleReplyOpen: (commentId: number) => void
  setReplyOpen: (commentId: number, open: boolean) => void

  /**
   * UX 정책: 답글 폼은 한 번에 1개만 열리게 (다른 답글 폼은 자동으로 닫힘)
   */
  openOnlyReply: (commentId: number) => void
  closeAllReply: () => void

  replyTextByCommentId: Record<number, string>
  setReplyText: (commentId: number, text: string) => void
  resetReplyText: (commentId: number) => void

  editOpenByCommentId: Record<number, boolean>
  setEditOpen: (commentId: number, open: boolean) => void

  /**
   * UX 정책: 수정 폼은 한 번에 1개만 열리게 (다른 수정 폼은 자동으로 닫힘)
   */
  openOnlyEdit: (commentId: number) => void
  closeAllEdit: () => void

  editTextByCommentId: Record<number, string>
  setEditText: (commentId: number, text: string) => void
  resetEditText: (commentId: number) => void
}

type CommentsStore = CommentsUiState & {
  actionsByPostId: Record<number, CommentsActions | undefined>
  setActions: (postId: number, actions: CommentsActions) => void
  clearActions: (postId: number) => void
}

type ExclusiveForm = 'reply' | 'edit'

const getExclusiveOpenState = (
  form: ExclusiveForm,
  commentId: number,
): Pick<CommentsUiState, 'replyOpenByCommentId' | 'editOpenByCommentId'> => {
  if (form === 'reply') {
    return {
      replyOpenByCommentId: { [commentId]: true },
      editOpenByCommentId: {},
    }
  }

  return {
    editOpenByCommentId: { [commentId]: true },
    replyOpenByCommentId: {},
  }
}

export const useCommentStore = create<CommentsStore>((set) => ({
  commentTextByPostId: {},
  setCommentText: (postId, text) =>
    set((s) => ({ commentTextByPostId: { ...s.commentTextByPostId, [postId]: text } })),
  resetCommentText: (postId) =>
    set((s) => ({ commentTextByPostId: { ...s.commentTextByPostId, [postId]: '' } })),

  replyOpenByCommentId: {},
  toggleReplyOpen: (id) =>
    set((s) => {
      const prev = s.replyOpenByCommentId[id] ?? false
      if (!prev) return getExclusiveOpenState('reply', id)
      return { replyOpenByCommentId: { ...s.replyOpenByCommentId, [id]: false } }
    }),
  setReplyOpen: (id, open) =>
    set((s) => {
      if (open) return getExclusiveOpenState('reply', id)
      return { replyOpenByCommentId: { ...s.replyOpenByCommentId, [id]: false } }
    }),
  openOnlyReply: (id) => set(() => getExclusiveOpenState('reply', id)),
  closeAllReply: () => set(() => ({ replyOpenByCommentId: {} })),

  replyTextByCommentId: {},
  setReplyText: (id, text) =>
    set((s) => ({ replyTextByCommentId: { ...s.replyTextByCommentId, [id]: text } })),
  resetReplyText: (id) =>
    set((s) => ({ replyTextByCommentId: { ...s.replyTextByCommentId, [id]: '' } })),

  editOpenByCommentId: {},
  setEditOpen: (id, open) =>
    set((s) => {
      if (open) return getExclusiveOpenState('edit', id)
      return { editOpenByCommentId: { ...s.editOpenByCommentId, [id]: false } }
    }),
  openOnlyEdit: (id) => set(() => getExclusiveOpenState('edit', id)),
  closeAllEdit: () => set(() => ({ editOpenByCommentId: {} })),

  editTextByCommentId: {},
  setEditText: (id, text) =>
    set((s) => ({ editTextByCommentId: { ...s.editTextByCommentId, [id]: text } })),
  resetEditText: (id) =>
    set((s) => ({ editTextByCommentId: { ...s.editTextByCommentId, [id]: '' } })),

  actionsByPostId: {},
  setActions: (postId, actions) =>
    set((s) => ({ actionsByPostId: { ...s.actionsByPostId, [postId]: actions } })),
  clearActions: (postId) =>
    set((s) => {
      const next = { ...s.actionsByPostId }
      delete next[postId]
      return { actionsByPostId: next }
    }),
}))
