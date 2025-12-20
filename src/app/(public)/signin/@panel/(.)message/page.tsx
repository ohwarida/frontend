'use client'

import { FileQuestionMark } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PanelMessagePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const title = searchParams.get('title') ?? '안내'
  const message =
    searchParams.get('message') ?? '관리자의 승인을 완료해야 서비스를 이용하실 수 있습니다.'

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <button
        aria-label="close overlay"
        onClick={() => router.back()}
        className="absolute inset-0 bg-black/40"
      />

      <div className="relative z-10 mb-56 w-[340px] rounded-2xl bg-white px-5 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-blue-400">
          <FileQuestionMark className="h-7 w-7 text-white" />
        </div>

        <h2 className="text-center text-lg font-semibold text-gray-900">{title}</h2>

        <p className="mt-3 text-center text-sm leading-6 text-gray-500">{message}</p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            홈으로 이동
          </button>
        </div>

        <div className="my-8 h-[1px] w-full bg-gray-200" />

        <p className="mt-6 text-center text-xs text-gray-400">
          문제가 지속되면 관리자에게 문의하세요.
        </p>
      </div>
    </div>
  )
}
