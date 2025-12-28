'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">문제가 발생했어요</h2>
      <p className="mt-2 text-sm text-gray-600">{error.message}</p>

      <button type="button" onClick={() => reset()} className="mt-4 rounded-md border px-3 py-2">
        다시 시도
      </button>
    </div>
  )
}
