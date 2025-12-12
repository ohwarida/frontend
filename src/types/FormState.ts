export type FormState<T> = {
  values: Partial<T>
  fieldErrors: Partial<Record<keyof T, string[]>>
  success: boolean
}
