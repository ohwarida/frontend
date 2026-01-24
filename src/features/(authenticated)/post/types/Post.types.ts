import { TopicType } from '@/types/Topic.types'

export type Post = {
  writerId: number
  postId: number
  writerName: string
  title: string
  topic: TopicType
  wroteAt: string
  content: string
  nextPost: {
    nextPostId?: number
    nextPostTitle?: string
  }
  previousPost: {
    previousPostId?: number
    previousPostTitle?: string
  }
  tags?: string[] // TODO: 필요 여부 검토
  highlightType: HighlightType
  commentsCount: number
  reactions: Reaction[]
}

export type ReactionType = 'LIKE' | 'HEART' | 'SMILE'

export type Reaction = {
  reactionType: ReactionType
  count: number
  reactedByMe: boolean
}

export type HighlightType = 'BY_ADMIN' | 'BY_REACTION' | 'BY_VIEW' | 'NONE'

export type GetPostDetailResponse = Post

export type PostCard = Omit<Post, 'content'>

export type GetPostsResponse = {
  contents: PostCard[]
  hasNext: boolean
  nextPage: number | null
}

export type CreatePostRequest = {
  draftId: string
  topic: TopicType
  title: string
  content: string
  highlightType: HighlightType
}

export type UpdatePostRequest = CreatePostRequest & { postId: number }

export type PostFormValues = {
  topic: TopicType
  title: string
  content: string
  draftId?: string // uuid
}

export type PostFormState = FormStateTypes<PostFormValues> & {
  postId?: number | null
}
