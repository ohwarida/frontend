import React from 'react'
import { ModalShell } from '@/components/modal/shell/ModalShell'

export default function RightModal({
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
      <div className="absolute top-0 right-0 bottom-0 flex w-[40vw] max-w-[1000px] min-w-[320px] flex-col border-l border-gray-300 bg-gray-100 shadow-[-20px_0_60px_rgba(0,0,0,0.2)]">
        {children}
      </div>
    </ModalShell>
  )
}
