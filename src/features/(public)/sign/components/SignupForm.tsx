'use client'

import React, { useActionState } from 'react'
import { signupAction } from '@/features/(public)/sign/signupAction'
import FormInput from '@/components/form/FormInput'
import { FormState } from '@/types/FormState'
import { SignupFormType } from '@/features/(public)/sign/types/signupFormType'

export const initialState: FormState<SignupFormType> = {
  values: {
    name: '',
    phoneNumber: '',
    token: '',
    provider: '',
  },
  fieldErrors: {},
  success: false,
}

export default function SignupForm({ token, provider }: { token: string; provider: string }) {
  const [state, formAction, isPending] = useActionState<FormState<SignupFormType>, FormData>(
    signupAction,
    initialState,
  )

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="provider" value={provider} />
      <input type="hidden" name="token" value={token} />

      <FormInput
        name="name"
        label="이름"
        id="name"
        required
        placeholder="홍길동"
        errorMessage={state.fieldErrors?.name?.[0]}
      />

      <FormInput
        name="phoneNumber"
        placeholder="010-1234-5678"
        label="전화번호"
        id="phoneNumber"
        type="tel"
        required
        errorMessage={state.fieldErrors?.phoneNumber?.[0]}
      />

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isPending && <span className="mr-2 animate-spin">⏳</span>}
        회원가입 완료
      </button>
    </form>
  )
}
