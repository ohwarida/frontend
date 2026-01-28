'use client'

import React, { useActionState, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import {
  applyStudyAction,
  type StudyApplyFormState,
} from '@/features/(authenticated)/post/actions/studyApply.action'

export function ApplyStudyModal({
  returnTo = '/study',
  studyId,
}: {
  returnTo?: string
  studyId: string
  backdropClassName?: string
}) {
  const router = useRouter()

  const close = useCallback(() => {
    router.replace(returnTo)
    router.refresh()
  }, [router, returnTo])

  const [appeal, setAppeal] = useState('')

  const [state, formAction] = useActionState<StudyApplyFormState, FormData>(applyStudyAction, {
    success: false,
  })

  useEffect(() => {
    if (!state?.success) return
    close()
  }, [state?.success, close])

  const hasText = appeal.trim().length > 0

  return (
    <div
      className={[
        'relative w-[512px]',
        'rounded-[10px] border border-black/10 bg-white',
        'shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]',
        'flex flex-col',
      ].join(' ')}
    >
      <form action={formAction} className="flex flex-col">
        <input type="hidden" name="studyId" value={studyId} />

        {/* Header */}
        <div className="px-[25px] pt-[25px]">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-[18px] leading-[18px] font-semibold text-[#0A0A0A]">
                모임 참여 신청
              </h2>
              <p className="text-[14px] leading-5 font-normal text-[#717182]">
                모임장에게 간단한 자기소개와 신청 동기를 남겨주세요.
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              className="mt-[2px] inline-flex h-8 w-8 items-center justify-center rounded-[8px] opacity-70 hover:bg-black/5"
              aria-label="닫기"
            >
              <X size={16} className="text-[#0A0A0A]" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-[25px] pt-[24px]">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] leading-[14px] font-medium text-[#0A0A0A]">
              신청 메시지
            </label>

            <input
              name="appeal"
              value={appeal}
              onChange={(e) => setAppeal(e.target.value)}
              placeholder="예: 안녕하세요! 프론트엔드 개발자 000입니다. 열심히 참여하겠습니다."
              className="h-9 w-full rounded-[8px] bg-[rgba(255,255,255,0.00001)] px-3 text-[14px] leading-[17px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] outline-none placeholder:text-[#717182]"
            />

            {state?.fieldErrors?.appeal && (
              <p className="text-[12px] leading-4 text-red-600">{state.fieldErrors.appeal}</p>
            )}

            {state?.message && !state.success && (
              <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] leading-5 text-red-700">
                {state.message}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-[25px] pt-[16px] pb-[25px]">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="h-9 rounded-[8px] border border-black/10 bg-white px-4 text-[14px] leading-5 font-medium text-[#0A0A0A]"
            >
              취소
            </button>

            <SubmitButton enabled={hasText} />
          </div>
        </div>

        <div className="sr-only">studyId: {studyId}</div>
      </form>
    </div>
  )
}

function SubmitButton({ enabled }: { enabled: boolean }) {
  const { pending } = useFormStatus()
  const disabled = !enabled || pending

  return (
    <button
      type="submit"
      disabled={disabled}
      className={[
        'h-9 rounded-[8px] px-4 text-[14px] leading-5 font-medium text-white',
        disabled
          ? 'cursor-not-allowed bg-black/20 text-[#0A0A0A]/40'
          : 'bg-[#030213] hover:opacity-95',
      ].join(' ')}
    >
      {pending ? '전송 중...' : '신청 보내기'}
    </button>
  )
}
