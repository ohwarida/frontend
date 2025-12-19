import { create } from 'zustand'
import { UserRole } from '@/features/(authenticated)/admin/types/AdminPage.types'

type roleState = {
  rolesByUserId: Record<number, UserRole>
  setRole: (userId: number, role: UserRole) => void
}

export const useRoleStore = create<roleState>((set) => ({
  rolesByUserId: {},
  setRole: (userId, role) =>
    set((state) => ({
      rolesByUserId: { ...state.rolesByUserId, [userId]: role },
    })),
}))
