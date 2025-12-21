import { UserErrorCode } from '@/constants/error-code/user'

export type SigninErrorTypes = {
  code: UserErrorCode
  message: string
  idToken?: string
}
