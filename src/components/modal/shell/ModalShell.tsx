'use client'

import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useCloseModal } from '@/hooks/useCloseModal'
import { useLockBodyScroll } from '@/hooks/useScrollBox'

export function ModalShell({
  children,
  backdropClassName,
  returnTo,
}: {
  children: React.ReactNode
  backdropClassName?: string
  returnTo?: string
}) {
  const close = useCloseModal(returnTo)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close])

  useLockBodyScroll()

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* backdrop */}
      <button
        type="button"
        aria-label="닫기"
        onClick={close}
        className={clsx('absolute inset-0 bg-black/40', backdropClassName)}
      />
      {children}
    </div>
  )
}
