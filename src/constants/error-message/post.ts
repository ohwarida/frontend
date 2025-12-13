import { POST_ERROR_CODE, PostErrorCode } from '@/constants/error-code/post'

/**
 * 게시글 관련 에러 코드 → 사용자 노출 메시지 매핑
 */
export const POST_ERROR_MESSAGE: Record<PostErrorCode, string> = {
  [POST_ERROR_CODE.NOT_FOUND_POST]: '해당 게시글을 찾을 수 없습니다.',
  [POST_ERROR_CODE.TITLE_TOO_LONG]: '제목은 50자를 초과할 수 없습니다.',
  [POST_ERROR_CODE.CONTENT_TOO_LONG]: '본문은 5000자를 초과할 수 없습니다.',
  [POST_ERROR_CODE.TITLE_IS_EMPTY]: '제목을 입력해 주세요.',
  [POST_ERROR_CODE.YOU_ARE_NOT_OWNER_THIS_POST]: '게시글 작성자만 수정/삭제할 수 있습니다.',
} as const
