import MiddleModal from '@/components/modal/MiddleModal'
import ModalMessage from '@/components/modal/components/ModalMessage'

export default function MessagePage() {
  return (
    <MiddleModal>
      <ModalMessage buttonMessage="홈으로 이동" />
    </MiddleModal>
  )
}
