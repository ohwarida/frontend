import { CommentReactionSummary } from './Reaction.types'

export type CommentAuthor = {
  userId: number
  name: string
  trackName: string
  profileImageUrl: string | null
}

export type Comment = {
  commentId: number
  content: string
  author: CommentAuthor
  createdAt: string // "2025-12-17T15:33:51.878642"
  isDeleted: boolean
  replies: Comment[]
  commentReactionStats: CommentReactionSummary
}

export type GetCommentsResponse = {
  contents: Comment[]
  hasNext?: boolean
  nextPage?: number | null
}

export type CreateCommentRequest = {
  postId: number
  parentId: null | number // null일 경우 댓글, parentId가 있을 경우 대댓글
  content: string // string, 2000자
  mentionUserIds?: number[]
}

export type UpdateCommentRequest = {
  content: string
}
