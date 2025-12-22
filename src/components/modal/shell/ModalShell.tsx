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
  const router = useRouter()
  const close = useCallback(() => {
    returnTo ? router.replace(returnTo) : router.back()
  }, [router, returnTo])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close])

  return (
    <div className="fixed inset-0 z-[9999]">
      <button
        aria-label="close overlay"
        onClick={close}
        className={clsx('absolute inset-0 bg-black/40', backdropClassName)}
      />
      {children}
    </div>
  )
}
