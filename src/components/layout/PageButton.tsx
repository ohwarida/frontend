'use client'

import {
  TOPIC_LABEL,
  TOPIC_TYPE,
} from '@/features/(authenticated)/content/create/types/Topic.types'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { id: TOPIC_TYPE.ALL, label: TOPIC_LABEL.ALL, href: '/' },
  { id: TOPIC_TYPE.NOTICE, label: TOPIC_LABEL.NOTICE, href: '/notice' },
  { id: TOPIC_TYPE.EMPLOYMENT_TIP, label: TOPIC_LABEL.EMPLOYMENT_TIP, href: '/job-tips' },
  { id: TOPIC_TYPE.TREND, label: TOPIC_LABEL.TREND, href: '/trend' },
  { id: TOPIC_TYPE.KNOWLEDGE, label: TOPIC_LABEL.KNOWLEDGE, href: '/knowledge' },
]

export default function PageButton() {
  const pathname = usePathname()

  return (
    <>
      <nav className="sticky top-20 flex h-[60px] items-end gap-2 bg-gray-50">
        {TABS.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={clsx(
                'h-10 max-h-10 min-h-10 rounded-md border p-3 text-center text-sm leading-none font-medium transition-colors',
                isActive
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
