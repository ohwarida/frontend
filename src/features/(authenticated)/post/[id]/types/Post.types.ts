import { TopicType } from '../../create/types/Topic.types'

export type Post = {
  writerId: number
  postId: number
  writerName: string
  title: string
  topic: TopicType
  wroteAt: string
  content: string
  tags?: string[] // TODO: 필요 여부 검토
  // TODO: 리액션 관련 프로퍼티 추가 예정
  commentsCount: number
}

export type HighlightType = 'BY_ADMIN' | 'BY_REACTION' | 'BY_VIEW' | 'NONE'

export type GetPostDetailResponse = Post

export type GetPostsResponse = {
  contents: Post[]
  // TODO: 무한스크롤 적용시 프로퍼티 추가 예정
  hasNext: boolean
  nextCursorId: number | null
}

export type CreatePostRequest = {
  topic: TopicType
  title: string
  content: string
  highlightType: HighlightType
}

export type UpdatePostRequest = CreatePostRequest & { postId: number }
