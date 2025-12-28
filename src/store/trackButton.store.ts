import { create } from 'zustand'

export type TrackFields = {
  trackId?: number | string
  trackName?: string
  startDate?: string | Date
  endDate?: string | Date
  trackStatus?: TrackStatus
}

const initialTrack: TrackFields = {
  trackId: undefined,
  trackName: undefined,
  startDate: undefined,
  endDate: undefined,
  trackStatus: undefined,
}

type TrackButtonState = TrackFields & {
  setField: <K extends keyof TrackFields>(key: K, value: TrackFields[K]) => void
  setTrack: (next: Partial<TrackFields>) => void
  reset: () => void
}

export const useTrackButtonStore = create<TrackButtonState>((set) => ({
  ...initialTrack,
  setField: (key, value) => set({ [key]: value } as Pick<TrackFields, typeof key>),
  setTrack: (next) => set((s) => ({ ...s, ...next })),
  reset: () => set(initialTrack),
}))
