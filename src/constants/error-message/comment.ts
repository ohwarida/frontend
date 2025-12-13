import { COMMENT_ERROR_CODE, CommentErrorCode } from '@/constants/error-code/comment'

/**
 * 댓글 관련 에러 코드 → 사용자 노출 메시지 매핑
 * - 백엔드 message를 그대로 노출하지 않고, 프론트에서 UX용 문구로 통일
 */
export const COMMENT_ERROR_MESSAGE: Record<CommentErrorCode, string> = {
  [COMMENT_ERROR_CODE.CONTENT_IS_EMPTY]: '댓글 내용을 입력해 주세요.',
  [COMMENT_ERROR_CODE.CONTENT_IS_TOO_LONG]: '댓글은 2000자를 초과할 수 없습니다.',
  [COMMENT_ERROR_CODE.COMMENT_REPLY_NOT_ALLOWED]: '대댓글을 작성할 수 없습니다.',

  [COMMENT_ERROR_CODE.COMMENT_NOT_FOUND]: '댓글을 찾을 수 없습니다.',
  [COMMENT_ERROR_CODE.COMMENT_PARENT_ID_NOT_FOUND]: '대댓글의 부모 댓글을 찾을 수 없습니다.',

  [COMMENT_ERROR_CODE.COMMENT_NOT_WRITER]: '댓글 작성자만 수정/삭제할 수 있습니다.',
} as const
