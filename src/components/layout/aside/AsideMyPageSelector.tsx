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
        'relative flex h-8.5 w-full items-center gap-3 rounded-xl bg-transparent',
        p === pathname ? 'text-blue-700' : pathname === '' ? 'text-gray-300' : '',
      )}
    >
      {/* 배경 */}
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 z-0 rounded-xl',
          p === pathname ? 'bg-blue-100' : pathname === '' ? '' : 'hover:bg-blue-100/20',
        )}
      />

      {/* 내용 */}
      <div
        className={clsx(
          'relative z-10 flex h-full w-full items-center gap-3 rounded-xl px-3',
          p === pathname ? '' : pathname === '' ? '' : 'hover:bg-blue-100/20',
        )}
      >
        {children}
      </div>
    </div>
  )
}
