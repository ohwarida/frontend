import React from 'react'
import ModalMessage from '@/components/modal/components/ModalMessage'
import MiddleModal from '@/components/modal/MiddleModal'

export default async function Page() {
  return (
    <MiddleModal returnTo="/admin/operator">
      <ModalMessage buttonMessage="홈으로 이동" />
    </MiddleModal>
  )
}
