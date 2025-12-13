import { TopicType } from '@/features/(authenticated)/content/create/types/Topic.types'

export type ContentFormValues = {
  topic: TopicType
  title: string
  content: string
}
