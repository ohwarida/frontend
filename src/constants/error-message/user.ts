import { USER_ERROR_CODE, UserErrorCode } from '@/constants/error-code/user'

/**
 * 유저/인증 관련 에러 코드 → 사용자 노출 메시지 매핑
 * - 보안/UX 관점에서 내부 사유는 숨기고 행동 유도 중심으로 통일
 */
export const USER_ERROR_MESSAGE: Record<UserErrorCode, string> = {
  [USER_ERROR_CODE.REQUEST_SIGNUP_NOT_FOUND]: '가입 요청 정보를 찾을 수 없습니다.',
  [USER_ERROR_CODE.REQUEST_SIGNUP_ALREADY_EXISTED]: '이미 가입 요청이 접수된 상태입니다.',
  [USER_ERROR_CODE.AUTHENTICATION_NOT_FOUND]: '인증 정보가 없습니다. 다시 로그인해 주세요.',
  [USER_ERROR_CODE.APPROVE_NECESSARY_ROLE]: '권한 승인이 필요합니다.',
  [USER_ERROR_CODE.ALREADY_SIGNED_USER]: '이미 가입된 계정입니다. 로그인해 주세요.',
  [USER_ERROR_CODE.USER_NOT_FOUND]: '사용자를 찾을 수 없습니다.',
  [USER_ERROR_CODE.ROLE_ADMIN_CANT_REQUEST]: '해당 권한으로는 가입 요청을 할 수 없습니다.',
  [USER_ERROR_CODE.INACTIVE_USER]: '계정이 아직 활성화되지 않았습니다. 승인 상태를 확인해 주세요.',
  [USER_ERROR_CODE.INVALID_REFRESH_TOKEN]: '로그인 정보가 만료되었습니다. 다시 로그인해 주세요.',
  [USER_ERROR_CODE.TOKEN_EXPIRED]: '로그인이 만료되었습니다. 다시 로그인해 주세요.',
} as const
