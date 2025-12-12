import React from 'react'
import PendingGuard from '@/features/(public)/pending/PendingGuard'

export default async function PendingPage() {
  return (
    <PendingGuard>
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md flex-col justify-center px-4 text-center">
        <h1 className="mb-3 text-2xl font-bold text-gray-900">승인 대기 중입니다</h1>

        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          회원가입 신청이 완료되었습니다. <br />
          관리자가 정보를 확인한 후 승인되면 로그인할 수 있습니다.
        </p>

        <div className="rounded-md bg-gray-100 px-4 py-3 text-xs text-gray-600">
          평균 승인 처리 시간: <span className="font-semibold">24시간 이내</span>
        </div>
      </div>
    </PendingGuard>
  )
}
