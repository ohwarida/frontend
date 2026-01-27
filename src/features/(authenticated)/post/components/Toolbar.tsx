'use client'

import { Funnel, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type TrackOption = { label: string; value: string }

type ToolbarProps = {
  recruitingCount: number
  selectedTrackLabel: string
  tracks: TrackOption[]
  selectedTrackId: string | null
}

export function Toolbar({
  recruitingCount,
  selectedTrackLabel,
  tracks,
  selectedTrackId,
}: ToolbarProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [open])

  const setTrackId = (trackId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!trackId) params.delete('trackId')
    else params.set('trackId', trackId)

    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={[
        'w-full',
        'flex flex-col gap-3',
        'md:flex-row md:items-center md:justify-between md:gap-0',
        'md:h-[78px]',
      ].join(' ')}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={[
            'box-border h-[46px] w-full pr-3 pl-1 sm:w-[204px]',
            'flex items-center gap-2',
            'rounded-full border border-[#F3F4F6] bg-white',
            'shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]',
            'hover:bg-[#FAFAFA] active:translate-y-[1px]',
            'focus:ring-2 focus:ring-[#155DFC]/20 focus:outline-none',
          ].join(' ')}
        >
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F9FAFB]"
            aria-hidden
          >
            <Funnel size={16} className="text-[#6A7282]" />
          </span>

          <span className="flex h-9 flex-1 items-center justify-between rounded-[8px] bg-[rgba(255,255,255,0.00001)] px-2">
            <span className="inline-flex h-5 items-center gap-2">
              <span className="text-[14px] leading-5 font-medium text-[#364153]">
                {selectedTrackLabel}
              </span>
            </span>

            <ChevronDown
              size={16}
              className={[
                'text-[#717182] opacity-50 transition-transform',
                open ? 'rotate-180' : 'rotate-0',
              ].join(' ')}
              aria-hidden
            />
          </span>
        </button>

        {open && (
          <div
            className={[
              'absolute top-[54px] left-0 z-50',
              'w-full sm:w-[204px]',
              'rounded-[12px] border border-[#E5E7EB] bg-white p-1 shadow',
            ].join(' ')}
          >
            <button
              type="button"
              onClick={() => setTrackId(null)}
              className="w-full rounded-[10px] px-3 py-2 text-left text-[14px] leading-5 text-[#101828] hover:bg-[#F9FAFB]"
            >
              전체 트랙
            </button>

            <div className="my-1 h-px bg-[#F3F4F6]" />

            {tracks.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTrackId(t.value)}
                className={[
                  'w-full rounded-[10px] px-3 py-2 text-left text-[14px] leading-5 hover:bg-[#F9FAFB]',
                  t.value === selectedTrackId ? 'text-[#155DFC]' : 'text-[#101828]',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="inline-flex items-center gap-2 md:justify-end">
        <span className="text-sm leading-5 font-normal text-[#6A7282]">현재 모집중인 스터디</span>
        <span className="inline-flex h-5 items-center justify-center rounded-full bg-[#EEF2FF] px-[10px] text-xs leading-4 font-bold text-[#4F39F6]">
          {recruitingCount}개
        </span>
      </div>
    </div>
  )
}
