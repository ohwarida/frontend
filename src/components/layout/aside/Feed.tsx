'use client'

import clsx from 'clsx'
import { Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const FEED_ITEMS = [
  { id: 'popular', label: '인기 게시글', icon: <TrendingUp size={16} />, active: true },
  { id: 'latest', label: '최신 게시글', icon: <Clock size={16} /> },
]

export default function Feed() {
  return (
    <section className="w-full rounded-md border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-1.5">
        {FEED_ITEMS.map((item) => {
          const isActive = item.active

          return (
            <Link
              href=""
              key={item.id}
              type="button"
              className={clsx(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50',
              )}
            >
              <span
                className={clsx(
                  'flex size-6 items-center justify-center rounded-full',
                  isActive ? 'bg-blue-50 text-blue-500' : 'bg-white text-gray-400',
                )}
              >
                {item.icon}
              </span>
              <span className="leading-none">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
