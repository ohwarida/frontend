'use client'

import React, { useCallback, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export function ModalShell({
  children,
  backdropClassName,
  returnTo,
}: {
  children: React.ReactNode
  backdropClassName?: string
  returnTo?: string
}) {
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className={clsx('absolute inset-0 bg-black/40', backdropClassName)} />
      {children}
    </div>
  )
}
