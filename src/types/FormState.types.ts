type FormStateTypes<T> = {
  values: Partial<T>
  fieldErrors: Partial<Record<keyof T, string[]>>
  success: boolean
  message?: string
}
