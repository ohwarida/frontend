'use client'

import Link from 'next/link'
import React from 'react'
import { CircleAlert } from 'lucide-react'
import clsx from 'clsx'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-white px-6">
      <section
        className={clsx(
          'w-full max-w-[420px] rounded-2xl bg-white px-10 py-10 text-center',
          'ring-1 ring-black/5',
          'shadow-[0_28px_70px_rgba(0,0,0,0.18)]',
        )}
      >
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDE2E2]">
          <CircleAlert className="h-6 w-6 text-[#EF4444]" />
        </div>

        <h1 className="text-[16px] leading-[24px] font-semibold text-[#171719]">
          문제가 발생했습니다
        </h1>

        <p className="mt-2 text-[12px] leading-[18px] text-[rgba(55,56,60,0.61)]">
          요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>

        {/* 필요하면 디버그용(프로덕션에선 숨기고 싶으면 조건 처리) */}
        {error?.digest && (
          <p className="mt-3 text-[11px] leading-[16px] text-[#9CA3AF]">
            오류 코드: {error.digest}
          </p>
        )}

        <div className="mt-6 flex items-center justify-center gap-2">
          <Link
            href="/"
            className={clsx(
              'inline-flex h-9 items-center justify-center rounded-md px-4',
              'border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#374151]',
              'shadow-sm hover:bg-[#F9FAFB]',
              'focus:ring-2 focus:ring-[#155DFC]/30 focus:outline-none',
            )}
          >
            홈으로 이동
          </Link>
        </div>

        <div className="mt-8 border-t border-[#F3F4F6]" />

        <p className="mt-4 text-[11px] leading-[16px] text-[#9CA3AF]">
          문제가 계속되면 관리자에게 문의하세요.
        </p>
      </section>
    </main>
  )
}
