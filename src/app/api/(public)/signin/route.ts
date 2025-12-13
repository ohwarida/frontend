import { NextRequest, NextResponse } from 'next/server'
import { SigninTypes } from '@/features/(public)/sign/types/Signin.types'
import { exchangeGoogleAuthCode } from '@/lib/o-auth/google'
import {
  ACCESS_TOKEN_MAX_AGE,
  ACCESS_TOKEN_PATH,
  ACCESS_TOKEN_SAME_SITE,
  REFRESH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_PATH,
  REFRESH_TOKEN_SAME_SITE,
} from '@/constants/token'
import { server } from '@/lib/api/server'
import { IS_PROD } from '@/constants/env'
import { HttpErrorTypes } from '@/types/HttpError.types'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { code } = body

  const tokenJson = await exchangeGoogleAuthCode(code)

  if (!tokenJson.id_token) {
    return NextResponse.json({ message: 'id_token is required' }, { status: 400 })
  }

  try {
    const response = await server<SigninTypes, { idToken: string }>('/api/v1/auth/login', {
      method: 'POST',
      body: { idToken: tokenJson.id_token },
      cache: 'no-store',
    })
    const res = NextResponse.json({ success: true })

    res.cookies.set('access_token', response.accessToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: ACCESS_TOKEN_SAME_SITE,
      path: ACCESS_TOKEN_PATH,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    })

    res.cookies.set('refresh_token', response.refreshToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: REFRESH_TOKEN_SAME_SITE,
      path: REFRESH_TOKEN_PATH,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })
    return res
  } catch (error) {
    if (error instanceof HttpErrorTypes) {
      const payload =
        typeof error.body === 'object' && error.body !== null
          ? error.body
          : { message: error.message }

      return NextResponse.json(
        error.status === 404 ? { ...payload, idToken: tokenJson.id_token } : payload,
        { status: error.status },
      )
    }

    console.error('Unhandled error in /api/signin:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
