'use client'

import React, { useActionState, useState } from 'react'
import { signupAction } from '@/features/(public)/signup/signupAction'
import FieldInput from '@/components/form/FieldInput'
import { SignupFormTypes } from '@/features/(public)/signup/types/SignupForm.types'
import FieldSelect from '@/components/form/FieldSelect'
import { Loader2 } from 'lucide-react'

export const initialState: FormStateTypes<SignupFormTypes> = {
  values: {
    name: '',
    phoneNumber: '',
    track: '',
    token: '',
    provider: '',
  },
  fieldErrors: {},
  success: false,
}

export default function SignupForm({
  token,
  provider,
  selectTrack,
}: {
  token: string
  provider: string
  selectTrack: { label: string; value: string }[]
}) {
  const [state, formAction, isPending] = useActionState<FormStateTypes<SignupFormTypes>, FormData>(
    signupAction,
    initialState,
  )
  const [phone, setPhone] = useState(state.values?.phoneNumber ?? '')

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="provider" value={provider} />
      <input type="hidden" name="token" value={token} />

      <FieldInput
        name="name"
        label="이름"
        id="name"
        required
        placeholder="홍길동"
        errorMessage={state.fieldErrors?.name?.[0]}
      />

      <FieldInput
        name="phoneNumber"
        placeholder="010-1234-5678"
        label="전화번호"
        id="phoneNumber"
        type="tel"
        required
        value={phone}
        inputMode="numeric"
        autoComplete="tel"
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        errorMessage={state.fieldErrors?.phoneNumber?.[0]}
      />

      <FieldSelect
        label="과정 선택"
        name="track"
        options={selectTrack}
        placeholder="현재 과정을 선택해주세요"
        inputClassName="h-10 "
      />

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isPending && <Loader2 className="mr-2 animate-spin" />}
        회원가입 완료
      </button>
    </form>
  )
}

function formatPhone(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}
