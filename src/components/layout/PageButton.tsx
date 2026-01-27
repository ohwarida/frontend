'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export function PageButton({
  TABS,
}: {
  TABS: { id: string; label: string; href?: string; onClick?: () => void; icon?: React.ReactNode }[]
}) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="hidden lg:sticky lg:top-(--header-h) lg:z-10 lg:-mx-5 lg:-mt-6 lg:block lg:bg-(--app-bg) lg:px-5 lg:pt-6 lg:pb-4">
      <nav className="flex h-12 items-center gap-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => {
          const hasHref = !!tab.href
          const isActive = hasHref
            ? tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href!)
            : false

          const baseClass = clsx(
            'inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-[8px] border px-4 text-[16px] leading-6 transition-colors',
            isActive
              ? 'border-[#155DFC] bg-[#EFF6FF] font-semibold text-[#155DFC]'
              : 'border-[#EAEBEC] bg-white font-normal text-[#101828] hover:bg-gray-50',
          )

          const iconClass = isActive ? 'text-[#155DFC]' : 'text-[#4A5565]'

          const content = (
            <>
              {tab.icon ? (
                <span className={clsx('inline-flex size-4 items-center justify-center', iconClass)}>
                  {tab.icon}
                </span>
              ) : null}
              {tab.label}
            </>
          )

          return hasHref ? (
            <Link key={tab.href} href={tab.href!} className={baseClass}>
              {content}
            </Link>
          ) : (
            <button key={tab.id} type="button" className={baseClass} onClick={tab.onClick}>
              {content}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
