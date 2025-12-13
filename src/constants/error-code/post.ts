export const POST_ERROR_CODE = {
  NOT_FOUND_POST: 'P-0001',
  TITLE_TOO_LONG: 'P-0002',
  CONTENT_TOO_LONG: 'P-0003',
  TITLE_IS_EMPTY: 'P-0004',
  YOU_ARE_NOT_OWNER_THIS_POST: 'P-0005',
} as const

export type PostErrorCode = (typeof POST_ERROR_CODE)[keyof typeof POST_ERROR_CODE]
