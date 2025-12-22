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
      <div className="absolute top-[40%] left-1/2 mb-56 w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        {children}
      </div>
    </ModalShell>
  )
}
