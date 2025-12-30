import React from 'react'
import MiddleModal from '@/components/modal/MiddleModal'
import ModalMessage from '@/components/modal/components/ModalMessage'

export default async function Page() {
  return (
    <MiddleModal returnTo="/admin/1">
      <ModalMessage buttonMessage="홈으로 이동" />
    </MiddleModal>
  )
}
