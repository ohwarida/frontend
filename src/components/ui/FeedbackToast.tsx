'use client'

import React from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'feedbackToastDismissed'

export function FeedbackToast() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY) === '1'
    setOpen(!dismissed)
  }, [])

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-x-0 bottom-[calc(108px+env(safe-area-inset-bottom))] z-50 mx-auto flex h-[46px] w-[374px] max-w-[calc(100vw-32px)] items-center justify-center gap-3 rounded-full border border-[#F3F4F6] bg-white px-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] md:bottom-6"
      role="status"
      aria-live="polite"
    >
      <p className="min-w-0 flex-1 truncate text-[14px] leading-[20px] font-normal text-[#364153]">
        성장을 위한 목소리, 소중한 의견을 듣습니다.
      </p>

      <a
        className="shrink-0 text-[14px] leading-[20px] font-medium whitespace-nowrap text-[#155DFC]"
        href="https://forms.gle/JehM1Whu6bHRrm2x9"
        target="_blank"
        rel="noopener noreferrer"
      >
        작성하기
      </a>

      <button
        type="button"
        onClick={handleClose}
        className="inline-flex h-4 w-4 shrink-0 items-center justify-center"
        aria-label="닫기"
      >
        <X className="h-4 w-4 text-[#99A1AF]" />
      </button>
    </div>
  )
}
