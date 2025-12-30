import { create } from 'zustand'
import { UserRole } from '@/features/(authenticated)/admin/root/types/AdminPage.types'

type roleState = {
  initialByUserId: Record<number, UserRole>
  rolesByUserId: Record<number, UserRole>
  changedByUserId: Record<number, boolean>

  initRole: (userId: number, initialRole: UserRole) => void
  setRole: (userId: number, role: UserRole) => void
}

export const useRoleStore = create<roleState>((set, get) => ({
  initialByUserId: {},
  rolesByUserId: {},
  changedByUserId: {},

  // 서버에서 내려온 초기 역할을 "기준값"으로 한 번 저장
  initRole: (userId, initialRole) =>
    set((state) => {
      // 이미 기준값이 있으면 덮어쓰지 않음
      if (state.initialByUserId[userId] !== undefined) return state

      return {
        initialByUserId: { ...state.initialByUserId, [userId]: initialRole },
        rolesByUserId: { ...state.rolesByUserId, [userId]: initialRole },
        changedByUserId: { ...state.changedByUserId, [userId]: false },
      }
    }),

  // 변경 시마다 초기값과 비교해서 changed만 갱신
  setRole: (userId, role) =>
    set((state) => {
      const initial = state.initialByUserId[userId]
      const changed = initial !== undefined ? initial !== role : false

      return {
        rolesByUserId: { ...state.rolesByUserId, [userId]: role },
        changedByUserId: { ...state.changedByUserId, [userId]: changed },
      }
    }),
}))
