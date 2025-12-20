import Link from 'next/link'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({
  page,
  size,
  totalPages,
  searchParams,
}: {
  page: number
  size: number
  totalPages: number
  searchParams: Record<string, string | string[] | undefined>
}) {
  if (totalPages <= 1) return null

  const makeHref = (nextPage: number) => {
    const sp = new URLSearchParams()

    for (const [k, v] of Object.entries(searchParams)) {
      if (typeof v === 'string') sp.set(k, v)
    }

    sp.set('page', String(nextPage))
    sp.set('size', String(size))
    return `?${sp.toString()}`
  }

  const current = page
  const start = Math.max(0, current - 2)
  const end = Math.min(totalPages - 1, current + 2)

  const pages: number[] = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex items-center justify-between gap-3 px-6 py-4">
      <div className="text-sm text-gray-600">
        페이지 <span className="font-semibold text-gray-900">{current + 1}</span> / {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={makeHref(Math.max(0, current - 1))}
          aria-disabled={current === 0}
          className={clsx(
            'flex h-7 items-center justify-center rounded-md border px-2 text-sm font-medium',
            current === 0
              ? 'pointer-events-none border-gray-200 bg-gray-100 text-gray-400'
              : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
          )}
        >
          <ChevronLeft size={16} />
        </Link>

        {start > 0 && (
          <>
            <Link
              href={makeHref(0)}
              className="h-7 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              1
            </Link>
            <span className="px-1 text-gray-400">…</span>
          </>
        )}

        {pages.map((p) => {
          const active = p === current
          return (
            <Link
              key={p}
              href={makeHref(p)}
              className={clsx(
                'flex h-7 min-w-7 items-center justify-center rounded-md border px-3 text-sm font-medium',
                active
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
              )}
            >
              {p + 1}
            </Link>
          )
        })}

        {end < totalPages - 1 && (
          <>
            <span className="px-1 text-gray-400">…</span>
            <Link
              href={makeHref(totalPages - 1)}
              className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              {totalPages}
            </Link>
          </>
        )}

        <Link
          href={makeHref(Math.min(totalPages - 1, current + 1))}
          aria-disabled={current >= totalPages - 1}
          className={clsx(
            'flex h-7 items-center justify-center rounded-md border px-2 text-sm font-medium',
            current >= totalPages - 1
              ? 'pointer-events-none border-gray-200 bg-gray-100 text-gray-400'
              : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
          )}
        >
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}
