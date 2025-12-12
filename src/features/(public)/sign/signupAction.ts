'use server'

import { api } from '@/lib/api/_index'
import { FormState } from '@/types/FormState'
import { SignupFormType } from '@/features/(public)/sign/types/signupFormType'
import { redirect } from 'next/navigation'

export async function signupAction(
  prevState: FormState<SignupFormType>,
  formData: FormData,
): Promise<FormState<SignupFormType>> {
  const name = formData.get('name')
  const phoneNumber = formData.get('phoneNumber')
  const token = formData.get('token')
  const provider = (formData.get('provider') ?? 'GOOGLE') as string

  const fieldErrors: FormState<SignupFormType>['fieldErrors'] = {}

  if (!name || typeof name !== 'string') fieldErrors.name = ['이름을 입력해주세요.']
  if (!phoneNumber || typeof phoneNumber !== 'string')
    fieldErrors.phoneNumber = ['전화번호를 입력해주세요.']
  if (!token || typeof token !== 'string') fieldErrors.token = ['유효하지 않은 인증 코드입니다.']

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      values: {
        name: typeof name === 'string' ? name : '',
        phoneNumber: typeof phoneNumber === 'string' ? phoneNumber : '',
        token: typeof token === 'string' ? token : '',
        provider,
      },
    }
  }

  try {
    await api.post('/api/v1/users/signup', {
      idToken: token,
      name,
      phoneNumber,
      provider,
    })
  } catch (err) {
    console.log(err)
  }
  redirect('/pending')
}
