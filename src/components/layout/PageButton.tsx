'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const TABS = [
  {id: 'all', label: '전체', href: '/'},
  {id: 'job', label: '취업 팁', href: '/job-tips'},
  {id: 'trend', label: '트렌드', href: '/trend'},
  {id: 'qa', label: 'Q&A', href: '/qna'},
  {id: 'retrospect', label: '회고', href: '/retrospect'},
  {id: 'notice', label: '공지사항', href: '/notice'},
]

export default function PageButton() {
  const pathname = usePathname()

  return (
    <>
      <nav className="flex items-end gap-2 sticky top-20 h-[60px] bg-gray-50">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={clsx(
                'rounded-md border leading-none p-3 text-sm font-medium transition-colors text-center h-10 min-h-10 max-h-10',
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
