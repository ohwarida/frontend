'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { MessageSquare, Heart, NotepadText } from 'lucide-react'
import React from 'react'

type Tab = {
  key: 'post' | 'comment' | 'like'
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const TABS: Tab[] = [
  { key: 'post', label: '내가 쓴 글', href: '/mypage/post', icon: NotepadText },
  { key: 'comment', label: '댓글', href: '/mypage/comment', icon: MessageSquare },
  { key: 'like', label: '좋아요', href: '/mypage/like', icon: Heart },
]

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href)
}

export function MyPageTabs() {
  const pathname = usePathname()

  return (
    <div className={clsx('lg:hidden', 'sticky top-(--header-h) z-10', 'bg-white px-5 pt-4 pb-3')}>
      <nav aria-label="My page tabs" className="w-full">
        <div className="h-12 w-full rounded-[12px] bg-[rgba(112,115,124,0.08)] p-[3px]">
          <div className="flex h-full items-center">
            {TABS.map((tab) => {
              const active = isActive(pathname, tab.href)
              const Icon = tab.icon

              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'relative flex h-[42px] flex-1 items-center justify-center rounded-[10px] px-[9px]',
                    'transition-colors',
                    'text-[17px] leading-[24px] font-medium',
                    active
                      ? 'bg-white text-[#171719] shadow-[0_0_4px_rgba(0,0,0,0.08)]'
                      : 'text-[rgba(55,56,60,0.61)]',
                  )}
                >
                  <span className="flex items-center justify-center gap-1">
                    <Icon
                      className={clsx(
                        'h-4 w-4',
                        active ? 'text-[#171719]' : 'text-[rgba(55,56,60,0.61)]',
                      )}
                    />
                    <span className="flex items-center text-center">{tab.label}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}
