export const TOPIC_TYPE = {
  ALL: 'ALL',
  NOTICE: 'NOTICE',
  EMPLOYMENT_TIP: 'EMPLOYMENT_TIP',
  SMALL_TALK: 'SMALL_TALK',
  KNOWLEDGE: 'KNOWLEDGE',
  STUDY: 'STUDY',
} as const

export const TOPIC_LABEL: Record<TopicType, string> = {
  ALL: '전체',
  NOTICE: '공지사항',
  EMPLOYMENT_TIP: '취업 팁',
  SMALL_TALK: '잡담',
  KNOWLEDGE: '지식',
  STUDY: '스터디/모집',
}

export type TopicType = (typeof TOPIC_TYPE)[keyof typeof TOPIC_TYPE]
