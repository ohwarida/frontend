'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import { nextApi } from '@/lib/api/_index'
import { SigninType } from '@/features/(public)/sign/types/signinType'
import { useRouter } from 'next/navigation'
import { isHttpError } from '@/utils/isHttpError'
import { usePendingStore } from '@/store/pendingStore'

export function useGoogleSignin() {
  const router = useRouter()
  const signinMutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await nextApi.post<SigninType>('/api/signin', { code })
      return res
    },
    onError: (error) => {
      if (isHttpError(error)) {
        if (error.status === 404) {
          const token = (error.body as { message: string; idToken: string }).idToken as string
          router.push(`/signup?token=${encodeURIComponent(token)}`)
        } else if ((error.body as { code: string }).code === 'U-0008') {
          const setPendingCode = usePendingStore.getState().setPendingCode
          setPendingCode((error.body as { code: string }).code)
          router.push('/pending')
        }
      }
    },
  })

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: 'openid profile email',
    onSuccess: ({ code }) => signinMutation.mutate(code),
    onError: (err) => {
      console.error('Google login failed', err)
    },
  })

  return {
    signWithGoogle: () => login(),
    isLoading: signinMutation.isPending,
  }
}
