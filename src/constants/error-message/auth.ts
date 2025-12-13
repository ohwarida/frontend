import { GOOGLE_AUTH_ERROR_CODE, GoogleAuthErrorCode } from '@/constants/error-code/auth'

export const GOOGLE_AUTH_ERROR_MESSAGE: Record<GoogleAuthErrorCode, string> = {
  [GOOGLE_AUTH_ERROR_CODE.MALFORMED_TOKEN]:
    '로그인 정보가 올바르지 않습니다. 다시 로그인해 주세요.',
  [GOOGLE_AUTH_ERROR_CODE.GOOGLE_SERVER_ERROR]:
    '구글 인증 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.',
  [GOOGLE_AUTH_ERROR_CODE.INVALID_SIGNATURE]: '인증 검증에 실패했습니다. 다시 로그인해 주세요.',
  [GOOGLE_AUTH_ERROR_CODE.TOKEN_EXPIRED_OR_INVALID]: '인증이 만료되었습니다. 다시 로그인해 주세요.',
  [GOOGLE_AUTH_ERROR_CODE.TOKEN_HAS_NOT_VALID_EMAIL]:
    '이메일 정보를 확인할 수 없습니다. 다른 계정으로 로그인해 주세요.',
} as const
