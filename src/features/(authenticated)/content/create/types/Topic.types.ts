export const TOPIC_TYPE = {
  EMPLOYMENT_TIP: 'EMPLOYMENT_TIP',
  KNOWLEDGE: 'KNOWLEDGE',
  NOTICE: 'NOTICE',
} as const

export const TOPIC_LABEL: Record<TopicType, string> = {
  EMPLOYMENT_TIP: '취업 팁',
  KNOWLEDGE: '지식',
  NOTICE: '공지사항',
}

export type TopicType = (typeof TOPIC_TYPE)[keyof typeof TOPIC_TYPE]
