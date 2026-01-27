export type StudyStatus = 'PENDING' | 'CLOSED' | 'REJECTED' | 'APPROVED'
export type StudyBudget = 'BOOK' | 'MEAL'

export type StudyLeader = {
  id: number
  name: string
  trackId: number
  trackName: string
  profileImageUrl: string | null
}

export type StudySchedule = {
  id: number
  month: number // 차수(개월차 등)
  recruitStartDate: string // ISO string 권장
  recruitEndDate: string
  studyEndDate: string
}

export type Study = {
  id: number
  leader: StudyLeader
  schedule: StudySchedule
  track: string
  name: string
  description: string
  capacity: number
  currentMemberCount: number
  status: StudyStatus
  budget: StudyBudget
  chatUrl: string
  refUrl: string | null
  tags: string[] // 최대 10개
  createdAt: string
  updatedAt: string
  isRecruitmentClosed: boolean
  isLeader: boolean
}

export type StudyCardItem = Study

export type GetStudiesParams = {
  trackId?: number
  status?: StudyStatus
  page?: number
  size?: number
  sort?: 'ASC' | 'DESC'
}

export type GetStudiesResponse = {
  content: Study[]
  hasNext: boolean
  pageNumber: number | null
}

export type ApplyStudyRequest = {
  appeal: string
}

export type Recruitment = {
  id: number
  studyId: number
  studyName: string
  trackName: string
  userId: number
  userName: string
  appeal: string
  status: StudyStatus
  createdAt: string
  approvedAt: string
}

export type GetStudyRecruitmentsResponse = {
  content: Recruitment[]
}

export type GetMyRecruitmentsResponse = {
  content: Recruitment[]
}

export type CreateStudyRequest = {
  name: string
  description: string
  capacity: number
  budget: StudyBudget
  chatUrl: string
  refUrl?: string
  tags?: string[]
}

export type CreateStudyResponse = { studyId: number }
export type UpdateStudyRequest = CreateStudyRequest
export type UpdateStudyResponse = void
