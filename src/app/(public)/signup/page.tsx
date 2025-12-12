import SignupForm from '@/features/(public)/sign/components/SignupForm'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function SignupPage(props: {
  searchParams: SearchParams | Promise<SearchParams>
}) {
  const searchParams = await props.searchParams
  const token = typeof searchParams.token === 'string' ? searchParams.token : ''

  // token 아예 없으면 차단
  if (!token || token.trim() === '') {
    redirect('/signin')
  }

  // JWT 형식이 맞는지 확인
  const isJwt = token.split('.').length === 3
  if (!isJwt) {
    redirect('/signin')
  }

  // 실제 JWT 검증
  try {
    jwt.decode(token)
  } catch (_) {
    redirect('/signin')
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-bold">추가 정보 입력</h1>
      <p className="mb-8 text-sm text-gray-600">
        구글 계정으로 기본 인증은 완료되었습니다. 서비스 이용을 위해 아래 정보를 마저 입력해주세요.
      </p>
      <SignupForm token={token} provider="GOOGLE" />
    </div>
  )
}
