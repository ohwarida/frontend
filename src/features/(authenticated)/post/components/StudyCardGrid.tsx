import { Recruitment, StudyCardItem, StudyStatus } from '../types/study.type'
import { StudyCard } from './StudyCard'

type StudyCardGridProps = {
  items: StudyCardItem[]
  myRecruitments?: Recruitment[]
}

export function StudyCardGrid({ items, myRecruitments = [] }: StudyCardGridProps) {
  const myStatusByStudyId = new Map<number, StudyStatus>(
    myRecruitments.map((r) => [r.studyId, r.status]),
  )

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <StudyCard
          key={item.id}
          item={item}
          myRecruitmentStatus={myStatusByStudyId.get(item.id) ?? null}
        />
      ))}
    </div>
  )
}
