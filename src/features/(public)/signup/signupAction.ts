'use server'

import { SignupFormTypes } from '@/features/(public)/signup/types/SignupForm.types'
import { redirect } from 'next/navigation'
import { server } from '@/lib/api/server'

function normalizePhoneKR(input: string) {
  return input.replace(/\D/g, '') // 숫자만
}

function validateKoreanMobile(phoneDigits: string) {
  // 한국 휴대폰: 01[016789] + (구번호는 10자리도 존재) 보통 10~11자리
  // - 010: 11자리(010xxxxxxxx)
  // - 011/016/017/018/019: 10~11자리 케이스 존재
  const re = /^01[016789]\d{7,8}$/ // 총 10~11자리
  return re.test(phoneDigits)
}

export async function signupAction(
  prevState: FormStateTypes<SignupFormTypes>,
  formData: FormData,
): Promise<FormStateTypes<SignupFormTypes>> {
  const name = formData.get('name')
  const phoneNumber = formData.get('phoneNumber')
  const track = formData.get('track')
  const token = formData.get('token')
  const provider = (formData.get('provider') ?? 'GOOGLE') as string

  const fieldErrors: FormStateTypes<SignupFormTypes>['fieldErrors'] = {}

  if (!name || typeof name !== 'string') fieldErrors.name = ['이름을 입력해주세요.']

  // phone 검증 강화 <- 확인 바람
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    fieldErrors.phoneNumber = ['전화번호를 입력해주세요.']
  } else {
    const digits = normalizePhoneKR(phoneNumber)

    if (!validateKoreanMobile(digits)) {
      fieldErrors.phoneNumber = ['휴대폰 번호는(010/011/016/017/018/019)만 입력할 수 있습니다.']
    }
  }

  if (!track || typeof track !== 'string') fieldErrors.track = ['과정을 선택해주세요.']
  if (!token || typeof token !== 'string') fieldErrors.token = ['유효하지 않은 인증 코드입니다.']

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      values: {
        name: typeof name === 'string' ? name : '',
        phoneNumber: typeof phoneNumber === 'string' ? phoneNumber : '',
        track: typeof track === 'string' ? track : '',
        token: typeof token === 'string' ? token : '',
        provider,
      },
    }
  }

  const phoneDigits = normalizePhoneKR(phoneNumber as string)

  try {
    await server('/api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        name,
        trackId: track,
        phoneNumber: phoneDigits,
        provider,
      }),
      cache: 'no-store',
    })
  } catch (_) {}

  const sp = new URLSearchParams({
    title: '가입이 완료되었습니다.',
    message: '관리자가 승인을 완료하면 서비스를 이용가능합니다.',
    returnTo: '/signin',
  })
  redirect(`/signin/message?${sp.toString()}`)
}
