'use client'

import { useEffect } from 'react'
import type { User } from '@/features/(authenticated)/users/types/User.type'
import { useAuthStore } from '@/store/auth.store'

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | null
  children: React.ReactNode
}) {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    setUser(initialUser)
  }, [setUser, initialUser])

  return children
}
