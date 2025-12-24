'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { isHttpError } from '@/utils/isHttpError'
import { USER_ERROR_CODE } from '@/constants/error-code/user'
import { SigninErrorTypes } from '@/features/(public)/signin/types/SigninError.types'
import { client } from '@/lib/api/client'
import { USER_ERROR_MESSAGE } from '@/constants/error-message/user'
import { HttpErrorTypes } from '@/types/HttpError.types'

export function useGoogleSignin() {
  const router = useRouter()
  const signinMutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await client('/api/signin', {
        method: 'POST',
        body: { code },
        cache: 'no-store',
      })
      if (res.status === 204) return null

      const data = await res.json()
      if (!res.ok) throw new HttpErrorTypes(res.status, data?.message ?? `HTTP ${res.status}`, data)
      return data
    },
    onSuccess: () => router.push('/'),
    onError: (error) => {
      if (!isHttpError(error)) return

      if ((error.body as SigninErrorTypes).code === USER_ERROR_CODE.USER_NOT_FOUND) {
        const token = (error.body as SigninErrorTypes)?.idToken
        if (token) {
          router.push(`/signup?token=${encodeURIComponent(token)}`)
        } else {
          const sp = new URLSearchParams({
            title: '유저 알림', //todo 성규님과 상의
            message: USER_ERROR_MESSAGE[USER_ERROR_CODE.USER_NOT_FOUND],
          })
          router.push(`/signin/message?${sp.toString()}`)
        }
      } else {
        const sp = new URLSearchParams({
          title: '알림',
          message: USER_ERROR_MESSAGE[(error.body as SigninErrorTypes).code],
        })

        router.push(`/signin/message?${sp.toString()}`)
      }
    },
  })

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: 'openid profile email',
    onSuccess: ({ code }) => signinMutation.mutate(code),
    onError: (err) => console.error('Google login failed', err),
  })

  return {
    signWithGoogle: () => login(),
    isLoading: signinMutation.isPending,
  }
}
