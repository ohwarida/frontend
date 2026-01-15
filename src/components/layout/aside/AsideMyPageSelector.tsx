'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function AsideMyPageSelector({
  children,
  pathname,
}: {
  children: React.ReactNode
  pathname: string
}) {
  const p = usePathname()

  return (
    <div
      className={clsx(
        'relative flex h-12 w-full items-center gap-3 px-3',
        p === pathname ? 'text-blue-700' : pathname === '' ? 'text-gray-300' : '',
      )}
    >
      <div
        className={clsx('absolute inset-0 rounded-xl', p === pathname ? 'bg-blue-200/50' : '')}
      />
      {children}
    </div>
  )
}
