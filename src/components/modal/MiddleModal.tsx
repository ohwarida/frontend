import React from 'react'
import { ModalShell } from '@/components/modal/shell/ModalShell'

export default function MiddleModal({
  returnTo,
  children,
  backdropClassName,
}: {
  returnTo?: string
  children: React.ReactNode
  backdropClassName?: string
}) {
  return (
    <ModalShell returnTo={returnTo} backdropClassName={backdropClassName}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">{children}</div>
    </ModalShell>
  )
}
