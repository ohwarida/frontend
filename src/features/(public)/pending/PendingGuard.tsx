'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePendingStore } from '@/store/pendingStore'

export default function PendingGuard({ children }: { children: React.ReactNode }) {
  const pendingCode = usePendingStore((s) => s.pendingCode)
  const router = useRouter()

  useEffect(() => {
    if (!pendingCode) {
      router.replace('/signin')
    }
  }, [pendingCode, router])

  if (!pendingCode) return null

  return children
}
