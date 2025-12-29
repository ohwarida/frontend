'use client'

import Link from 'next/link'
import { Loader2, Plus, X } from 'lucide-react'
import { deleteTrack } from '@/features/(authenticated)/admin/track/actions/deleteTrack'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { TrackFields, useTrackButtonStore } from '@/store/trackButton.store'
import TrackFiled from '@/features/(authenticated)/admin/root/components/track/TrackFiled'

export default function AdminPageButton({ tabs }: { tabs: TrackFields[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const [deleteIsPending, startTransition] = useTransition()
  const { setField, reset } = useTrackButtonStore()
  const selectedTabData = tabs.find((t) => {
    const base = `/admin/${t.trackId}`
    return pathname === base || pathname.startsWith(`${base}/`)
  })

  return (
    <>
      <div className="relative w-full">
        <nav className="flex h-[48px] w-[calc(100%-130px)] items-end gap-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(`/admin/${tab.trackId}`)

            const chipClass = clsx(
              'inline-flex h-12 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors',
              isActive
                ? 'border-[#155DFC] bg-[#155DFC] text-white'
                : 'border-gray-200 text-[#344054] bg-white hover:bg-gray-50',
            )

            const closeClass = clsx(
              'ml-1 inline-flex border size-3.5 items-center justify-center rounded-full transition-colors',
              isActive
                ? 'border-white text-white hover:bg-white/30'
                : 'border-gray-300 text-gray-500 hover:bg-gray-200',
            )

            const content = (
              <>
                <span className="max-w-[180px] truncate">{tab.trackName}</span>
                {tab.trackId !== 'operator' && (
                  <button
                    type="button"
                    aria-label={`${tab.trackName} 제거`}
                    className={closeClass}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const ok = window.confirm('삭제할까요?')
                      if (!ok) return

                      startTransition(async () => {
                        try {
                          await deleteTrack(tab.trackId as number)
                          router.replace(`/admin/operator`)
                        } catch (e) {
                          alert(e instanceof Error ? e.message : '삭제 실패')
                        }
                      })
                    }}
                  >
                    {deleteIsPending ? <Loader2 className="animate-spin" /> : <X size={16} />}
                  </button>
                )}
              </>
            )

            return (
              <Link
                key={tab.trackId}
                href={`/admin/${tab.trackId}`}
                onClick={() => {
                  setField('trackId', tab.trackId as number)
                  setField('trackName', tab.trackName)
                  setField('startDate', tab.startDate as string)
                  setField('endDate', tab.endDate as string)
                  setField('trackStatus', tab.trackStatus as TrackStatus)
                }}
                className={chipClass}
              >
                {content}
              </Link>
            )
          })}

          {pathname === '/admin/track' ? (
            <Link
              href="/admin"
              className={clsx(
                'absolute right-0 bottom-0 flex h-9 items-end justify-between gap-1 rounded-md border px-2 py-1',
                'test-black border-gray-50 bg-gray-200/50',
              )}
            >
              <X />
              닫기
            </Link>
          ) : (
            <Link
              href="/admin/track"
              className={clsx(
                'absolute right-0 bottom-0 flex h-9 items-end justify-between gap-1 rounded-md border px-2 py-1',
                'border-green-300 bg-green-200/50 text-green-600',
              )}
              onClick={() => reset()}
            >
              <Plus />
              트랙 생성
            </Link>
          )}
        </nav>
      </div>

      <TrackFiled selectedTabData={selectedTabData!} />
    </>
  )
}
