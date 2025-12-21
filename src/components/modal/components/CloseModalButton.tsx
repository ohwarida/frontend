'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export function CloseModalButton() {
  const router = useRouter()
  const close = () => router.back()

  return (
    <button
      type="button"
      aria-label="close"
      onClick={close}
      className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
    >
      <X className="font-bold" size={20} />
    </button>
  )
}
