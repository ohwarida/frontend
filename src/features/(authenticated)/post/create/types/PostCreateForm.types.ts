import { TopicType } from '@/features/(authenticated)/post/create/types/Topic.types'

export type PostFormValues = {
  topic: TopicType
  title: string
  content: string
  draftId: string // uuid
}
