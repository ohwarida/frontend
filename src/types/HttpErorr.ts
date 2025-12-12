export type HttpError = Error & {
  status?: number
  body?: unknown
}
