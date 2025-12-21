'use client'

import { useAuthStore } from '@/store/auth.store'
import { useShallow } from 'zustand/shallow'

export const useAuthState = () =>
  useAuthStore(
    useShallow((s) => ({
      user: s.user,
      isAuthed: !!s.user,
      setUser: s.setUser,
      clearUser: s.clearUser,
    })),
  )
