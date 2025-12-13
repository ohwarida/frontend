import { TRACK_ERROR_CODE, TrackErrorCode } from '@/constants/error-code/track'

/**
 * 트랙(과정) 관련 에러 코드 → 사용자 노출 메시지 매핑
 */
export const TRACK_ERROR_MESSAGE: Record<TrackErrorCode, string> = {
  [TRACK_ERROR_CODE.TRACK_NOT_FOUND]: '해당 과정을 찾을 수 없습니다.',
} as const
