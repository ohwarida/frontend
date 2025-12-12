import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/api/_index'
import { SigninType } from '@/features/(public)/sign/types/signinType'
import { exchangeGoogleAuthCode } from '@/lib/o-auth/google'
import { isHttpError } from '@/utils/isHttpError'
import {
  ACCESS_TOKEN_MAX_AGE,
  ACCESS_TOKEN_PATH,
  ACCESS_TOKEN_SAME_SITE,
  REFRESH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_PATH,
  REFRESH_TOKEN_SAME_SITE,
} from '@/constants/token'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { code } = body

  const tokenJson = await exchangeGoogleAuthCode(code)

  if (!tokenJson.id_token) {
    return NextResponse.json({ message: 'id_token is required' }, { status: 400 })
  }

  try {
    const response = await api.post<SigninType>('/api/v1/auth/login', {
      idToken: tokenJson.id_token,
    })
    const res = NextResponse.json({ success: true })

    const isProd = process.env.NODE_ENV === 'production'

    res.cookies.set('access_token', response.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: ACCESS_TOKEN_SAME_SITE,
      path: ACCESS_TOKEN_PATH,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    })

    res.cookies.set('refresh_token', response.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: REFRESH_TOKEN_SAME_SITE,
      path: REFRESH_TOKEN_PATH,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })
    return res
  } catch (error) {
    if (isHttpError(error)) {
      const status = error.status ?? 500
      const body = {
        ...(error.body ?? {}),
        idToken: error.status !== 404 ? undefined : tokenJson.id_token,
      }
      return NextResponse.json(body, { status })
    }

    // 예상 못한 에러는 500으로
    console.error('Unhandled error in /api/signin:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
