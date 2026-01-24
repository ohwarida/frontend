export type GetMyCommentsResponse = {
  contents: Comment[]
  hasNext: boolean
  nextPage: number | null
}
export type CommentReactionSummary = {
  count: number
  reactedByMe: boolean
}

export type CommentReactionStats = {
  commentId: number
  totalCount: number
  summaries: Record<string, CommentReactionSummary>
}

export type CommentAuthor = {
  userId: number
  name: string
  trackName: string
  profileImageUrl: string
}

export type Comment = {
  commentId: number
  postId: number
  content: string
  author: CommentAuthor
  createdAt: string
  commentReactionStats: CommentReactionStats
  isDeleted: boolean
  replies: string[]
}
