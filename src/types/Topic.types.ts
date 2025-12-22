export const TOPIC_TYPE = {
  ALL: 'ALL',
  NOTICE: 'NOTICE',
  EMPLOYMENT_TIP: 'EMPLOYMENT_TIP',
  // TREND: 'TREND',
  KNOWLEDGE: 'KNOWLEDGE',
} as const

export const TOPIC_LABEL: Record<TopicType, string> = {
  ALL: '전체',
  NOTICE: '공지사항',
  EMPLOYMENT_TIP: '취업 팁',
  // TREND: '트렌드',
  KNOWLEDGE: '지식',
}

export type TopicType = (typeof TOPIC_TYPE)[keyof typeof TOPIC_TYPE]
