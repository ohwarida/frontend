'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw, Home, ChevronDown } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-6 py-5">
          <div className="mt-0.5 flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <AlertTriangle size={22} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900">문제가 발생했어요</h2>
            <p className="mt-1 text-sm text-gray-600">
              요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>

            {error?.digest ? (
              <p className="mt-2 text-xs text-gray-400">
                Error ID: <span className="font-mono">{error.digest}</span>
              </p>
            ) : null}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 active:bg-gray-900"
            >
              <RefreshCcw size={16} />
              다시 시도
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-white"
            >
              <Home size={16} />
              홈으로
            </Link>

            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-expanded={showDetails}
            >
              <ChevronDown
                size={16}
                className={showDetails ? 'rotate-180 transition' : 'transition'}
              />
              상세 보기
            </button>
          </div>

          {/* Details */}
          {showDetails ? (
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-700">에러 메시지</p>
              <pre className="mt-2 overflow-auto rounded-lg bg-white p-3 text-xs leading-relaxed text-gray-800">
                {error?.message || 'Unknown error'}
              </pre>

              {error?.stack ? (
                <>
                  <p className="mt-4 text-xs font-semibold text-gray-700">스택 트레이스</p>
                  <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-white p-3 text-xs leading-relaxed text-gray-700">
                    {error.stack}
                  </pre>
                </>
              ) : null}
            </div>
          ) : null}

          <p className="mt-5 text-xs text-gray-500">
            같은 문제가 계속되면 관리자에게 Error ID(있는 경우)와 함께 알려주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
