import Link from 'next/link'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({
  meta,
  searchParams,
  pageKey = 'page',
  sizeKey = 'size',
}: {
  meta: PaginationTypes
  searchParams: Record<string, string | string[] | undefined>
  pageKey?: string
  sizeKey?: string
}) {
  if (!meta) return null
  const { currentPage, pageSize, totalPages, isFirst, isLast } = meta

  if (totalPages <= 1) return null

  const makeHref = (nextPage: number) => {
    const sp = new URLSearchParams()

    for (const [k, v] of Object.entries(searchParams)) {
      if (typeof v === 'string') sp.set(k, v)
      else if (Array.isArray(v)) {
        sp.delete(k)
        v.forEach((vv) => sp.append(k, vv))
      }
    }

    sp.set(pageKey, String(nextPage))
    sp.set(sizeKey, String(pageSize))
    return `?${sp.toString()}`
  }

  const current = currentPage
  const start = Math.max(1, current - 2)
  const end = Math.min(totalPages, current + 2)

  const pages: number[] = []
  for (let p = start; p <= end; p++) pages.push(p)

  const prevPage = Math.max(1, current - 1)
  const nextPage = Math.min(totalPages, current + 1)

  return (
    <div className="flex items-center justify-between gap-3 px-6 py-4">
      <div className="text-sm text-gray-600">
        페이지 <span className="font-semibold text-gray-900">{current}</span> / {totalPages}
      </div>

      <div className="flex items-center gap-2">
        {/* 전 */}
        <Link
          href={makeHref(prevPage)}
          aria-disabled={isFirst}
          className={clsx(
            'flex h-7 items-center justify-center rounded-md border px-2 text-sm font-medium',
            isFirst
              ? 'pointer-events-none border-gray-200 bg-gray-100 text-gray-400'
              : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
          )}
        >
          <ChevronLeft size={16} />
        </Link>

        {start > 1 && (
          <>
            <Link
              href={makeHref(1)}
              className="h-7 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              1
            </Link>
            <span className="px-1 text-gray-400">…</span>
          </>
        )}

        {/* 버튼 생성 */}
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
              {p}
            </Link>
          )
        })}

        {end < totalPages && (
          <>
            <span className="px-1 text-gray-400">…</span>
            <Link
              href={makeHref(totalPages)}
              className="h-7 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              {totalPages}
            </Link>
          </>
        )}

        <Link
          href={makeHref(nextPage)}
          aria-disabled={isLast}
          className={clsx(
            'flex h-7 items-center justify-center rounded-md border px-2 text-sm font-medium',
            isLast
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
