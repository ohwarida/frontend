'use client'

import { create } from 'zustand'
import type { User } from '@/features/(authenticated)/users/types/User.type'

type AuthState = {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
