import { create } from 'zustand'

export type TrackField = {
  trackId?: number
  trackName?: string
  startDate?: string | Date
  endDate?: string | Date
  trackStatus?: TrackStatus
}

const initialTrack: TrackField = {
  trackId: undefined,
  trackName: undefined,
  startDate: undefined,
  endDate: undefined,
  trackStatus: undefined,
}

type TrackButtonState = TrackField & {
  setField: <K extends keyof TrackField>(key: K, value: TrackField[K]) => void
  setTrack: (next: Partial<TrackField>) => void
  reset: () => void
}

export const useTrackButtonStore = create<TrackButtonState>((set) => ({
  ...initialTrack,
  setField: (key, value) => set({ [key]: value } as Pick<TrackField, typeof key>),
  setTrack: (next) => set((s) => ({ ...s, ...next })),
  reset: () => set(initialTrack),
}))
