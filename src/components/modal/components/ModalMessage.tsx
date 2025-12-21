'use client'

import React from 'react'
import { FileQuestionMark } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ModalMessage({ buttonMessage = '확인' }: { buttonMessage?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const title = searchParams.get('title')
  const message = searchParams.get('message')
  const returnTo = searchParams.get('returnTo')

  return (
    <>
      <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-blue-400">
        <FileQuestionMark className="h-7 w-7 text-white" />
      </div>

      <h2 className="text-center text-lg font-semibold text-gray-900">{title}</h2>

      <p className="mt-3 text-center text-sm leading-6 text-gray-500">{message}</p>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => {
            if (returnTo) {
              router.replace(returnTo)
            } else {
              router.back()
            }
          }}
          className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {buttonMessage}
        </button>
      </div>

      <div className="my-8 h-[1px] w-full bg-gray-200" />

      <p className="text-center text-xs text-gray-400">문제가 지속되면 관리자에게 문의하세요.</p>
    </>
  )
}
