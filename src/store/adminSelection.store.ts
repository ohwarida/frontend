import { create } from 'zustand'

type AdminSelectionState = {
  selectedIds: number[]
  setSelected: (id: number, checked: boolean) => void
  toggle: (id: number) => void
  setAll: (ids: number[]) => void
  removeMany: (ids: number[]) => void
  clear: () => void
}

export const useAdminSelectionStore = create<AdminSelectionState>((set, get) => ({
  selectedIds: [],

  setSelected: (id, checked) =>
    set((state) => {
      const exists = state.selectedIds.includes(id)
      if (checked) {
        return exists ? state : { selectedIds: [...state.selectedIds, id] }
      }
      return { selectedIds: state.selectedIds.filter((x) => x !== id) }
    }),

  toggle: (id) => {
    const { selectedIds, setSelected } = get()
    setSelected(id, !selectedIds.includes(id))
  },

  setAll: (ids) =>
    set((state) => ({
      selectedIds: Array.from(new Set([...state.selectedIds, ...ids])),
    })),

  removeMany: (ids) =>
    set((state) => {
      const removeSet = new Set(ids)
      return { selectedIds: state.selectedIds.filter((x) => !removeSet.has(x)) }
    }),

  clear: () => set({ selectedIds: [] }),
}))
