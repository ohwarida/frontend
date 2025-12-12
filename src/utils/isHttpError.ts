import { HttpError } from '@/types/HttpErorr'

export const isHttpError = (error: unknown): error is HttpError =>
  error instanceof Error && 'status' in error
