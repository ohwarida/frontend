import React from 'react'
import clsx from 'clsx'

export default function Header({
  children,
  layoutType,
}: {
  children: React.ReactNode
  layoutType: 'public' | 'authenticated'
}) {
  return (
    <header
      className={clsx(
        'fixed inset-x-0 flex h-20 max-h-20 min-h-20 items-center',
        layoutType === 'public' ? 'bg-transparent' : 'border-b border-gray-200 bg-white',
      )}
    >
      <div className="mx-auto flex size-full max-w-7xl items-center gap-4 px-5">
        {/* 로고 자리 */}
        <div className="mr-5 flex shrink-0 items-center">
          <p className="text-2xl font-bold">Depth</p>
        </div>
        {children}
      </div>
    </header>
  )
}
