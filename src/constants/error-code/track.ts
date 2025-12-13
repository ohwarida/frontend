export const TRACK_ERROR_CODE = {
  TRACK_NOT_FOUND: 'T-0001',
} as const

export type TrackErrorCode = (typeof TRACK_ERROR_CODE)[keyof typeof TRACK_ERROR_CODE]
