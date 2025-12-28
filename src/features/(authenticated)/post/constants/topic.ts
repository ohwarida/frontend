import { TOPIC_TYPE, TopicType } from '@/types/Topic.types'
import { TABS } from './tabs'

export const HREF_BY_TOPIC = Object.fromEntries(
  TABS.filter((t) => t.id !== TOPIC_TYPE.ALL).map((t) => [t.id, t.href]),
) as Partial<Record<TopicType, string>>
