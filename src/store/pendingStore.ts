import { create } from 'zustand'

type PendingState = {
  pendingCode: string | null
  setPendingCode: (code: string) => void
  clearPendingCode: () => void
}

export const usePendingStore = create<PendingState>((set) => ({
  pendingCode: null,
  setPendingCode: (code) => set({ pendingCode: code }),
  clearPendingCode: () => set({ pendingCode: null }),
}))
