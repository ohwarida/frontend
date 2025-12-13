import { HttpErrorTypes } from '@/types/HttpError.types'

export const isHttpError = (e: unknown): e is HttpErrorTypes => {
  if (e instanceof HttpErrorTypes) return true

  if (typeof e !== 'object' || e === null) return false
  const any = e as HttpErrorTypes
  return typeof any.status === 'number' && 'body' in any
}
