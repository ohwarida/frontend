import { TABS } from '@/app/(authenticated)/(board)/layout'
import { TOPIC_TYPE, TopicType } from '@/types/Topic.types'

export const HREF_BY_TOPIC = Object.fromEntries(
  TABS.filter((t) => t.id !== TOPIC_TYPE.ALL).map((t) => [t.id, t.href]),
) as Partial<Record<TopicType, string>>
