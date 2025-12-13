'use server'

import { SignupFormTypes } from '@/features/(public)/signup/types/SignupForm.types'
import { redirect } from 'next/navigation'
import { server } from '@/lib/api/server'

export async function signupAction(
  prevState: FormStateTypes<SignupFormTypes>,
  formData: FormData,
): Promise<FormStateTypes<SignupFormTypes>> {
  const name = formData.get('name')
  const phoneNumber = formData.get('phoneNumber')
  const token = formData.get('token')
  const provider = (formData.get('provider') ?? 'GOOGLE') as string

  const fieldErrors: FormStateTypes<SignupFormTypes>['fieldErrors'] = {}

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
    await server('/api/v1/users/signup', {
      method: 'POST',
      body: {
        idToken: token,
        name,
        phoneNumber,
        provider,
      },
      cache: 'no-store',
    })
  } catch (err) {
    console.log(err)
  }
  redirect('/pending')
}
