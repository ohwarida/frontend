import MiddleModal from '@/components/modal/MiddleModal'
import { ApplyStudyModal } from '@/features/(authenticated)/post/components/ApplyStudyModal'

export default function ApplyStudyModalPage({ params }: { params: { id: string } }) {
  return (
    <MiddleModal returnTo="/study">
      <ApplyStudyModal studyId={params.id} />
    </MiddleModal>
  )
}
