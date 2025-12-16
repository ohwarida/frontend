'use client'

import clsx from 'clsx'
import { Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type SortKey = 'popular' | 'latest'

const SORT_PARAM = 'sort'
const DEFAULT_SORT: SortKey = 'popular'

const FEED_ITEMS: Array<{ id: SortKey; label: string; icon: React.ReactNode }> = [
  { id: 'popular', label: '인기 게시글', icon: <TrendingUp size={16} /> },
  { id: 'latest', label: '최신 게시글', icon: <Clock size={16} /> },
]

export default function Feed() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawSort = searchParams.get(SORT_PARAM) as SortKey | null
  const activeSort: SortKey = FEED_ITEMS.some((x) => x.id === rawSort)
    ? (rawSort as SortKey)
    : DEFAULT_SORT

  const makeHref = (nextSort: SortKey) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(SORT_PARAM, nextSort)

    // TODO - 정렬 바꾸면 pagination 초기화 같은 거 필요하면 여기서 제거
    // params.delete('page')

    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  return (
    <section className="w-full rounded-md border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-1.5" role="tablist" aria-label="피드 정렬">
        {FEED_ITEMS.map((item) => {
          const isActive = item.id === activeSort

          return (
            <Link
              href={makeHref(item.id)}
              key={item.id}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50',
              )}
              scroll={false}
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
