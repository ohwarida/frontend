'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PageButton({
  TABS,
}: {
  TABS: { id: string; label: string; href?: string; onClick?: () => void }[]
}) {
  const pathname = usePathname()

  return (
    <nav className="sticky top-20 flex h-[60px] items-end gap-2 bg-gray-50">
      {TABS.map((tab) => {
        const hasHref = !!tab.href

        const isActive = hasHref
          ? tab.href === '/'
            ? pathname === '/'
            : pathname.startsWith(tab.href!)
          : false

        const baseClass = clsx(
          'h-10 max-h-10 min-h-10 rounded-md border p-3 text-center text-sm leading-none font-medium transition-colors',
          isActive
            ? 'border-blue-500 bg-blue-500 text-white'
            : 'border-gray-200 text-gray-800 hover:bg-gray-50',
        )

        return hasHref ? (
          <Link key={tab.id} href={tab.href!} className={baseClass}>
            {tab.label}
          </Link>
        ) : (
          <button key={tab.id} type="button" className={baseClass} onClick={() => tab.onClick?.()}>
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
