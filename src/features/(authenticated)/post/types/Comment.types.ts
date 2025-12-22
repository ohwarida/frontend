export type CommentAuthor = {
  userId: number
  name: string
  profileImageUrl: string | null
}

export type Comment = {
  commentId: number
  content: string
  author: CommentAuthor
  createdAt: string // "2025-12-17T15:33:51.878642"
  likeCount: number
  isDeleted: boolean
  replies: Comment[]
  likedByMe?: boolean // TODO
}

export type GetCommentsResponse = Comment[]

export type CreateCommentRequest = {
  postId: number
  parentId: null | number // null일 경우 댓글, parentId가 있을 경우 대댓글
  content: string // string, 2000자
}

export type UpdateCommentRequest = {
  content: string
}
