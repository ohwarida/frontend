export type ReactionType = 'LIKE' | 'HEART' | 'SMILE'

export type Reaction = {
  reactionType: ReactionType
  count: number
  reactedByMe?: boolean
}

export type TargetType = 'POST' | 'COMMENT'

export type CreateReactionRequest = {
  targetType: TargetType
  targetId: number
  reactionType: ReactionType
}

export type DeleteReactionRequest = CreateReactionRequest

export type ReactionSummary = {
  count: number
  reactedByMe: boolean
}

export type PostReactionSummary = {
  postId: number
  totalCount: number
  summaries: Partial<Record<ReactionType, ReactionSummary>> // Record<ReactionType, ReactionSummary>
}

export type GetPostDetailReactionResponse = PostReactionSummary

export type GetPostsReactionRequest = {
  postIds: number[]
}

export type GetPostsReactionResponse = Record<string, PostReactionSummary>

export type CommentReactionSummary = {
  commentId: number
  totalCount: number
  summaries: Partial<Record<ReactionType, ReactionSummary>> // Record<ReactionType, ReactionSummary>
}

export type GetCommentsReactionRequest = {
  commentIds: number[]
}

export type GetCommentsReactionResponse = Record<string, CommentReactionSummary>
