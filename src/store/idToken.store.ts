import { create } from 'zustand'

type IdTokenState = {
  idToken: string | null
  setIdToken: (token: string | null) => void
  clear: () => void
}

export const useIdTokenStore = create<IdTokenState>((set) => ({
  idToken: null,
  setIdToken: (token) => set({ idToken: token }),
  clear: () => set({ idToken: null }),
}))
