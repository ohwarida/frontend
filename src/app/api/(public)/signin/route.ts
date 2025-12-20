import { NextRequest, NextResponse } from 'next/server'
import { exchangeGoogleAuthCode } from '@/lib/o-auth/google'
import { HttpErrorTypes } from '@/types/HttpError.types'
import {
  ACCESS_TOKEN_PATH,
  ACCESS_TOKEN_MAX_AGE,
  ACCESS_TOKEN_SAME_SITE,
  REFRESH_TOKEN_PATH,
  REFRESH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_SAME_SITE,
} from '@/constants/token'
import { IS_PROD } from '@/constants/env'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { code } = body

  const tokenJson = await exchangeGoogleAuthCode(code)

  if (!tokenJson.id_token) {
    return NextResponse.json({ message: 'id_token is required' }, { status: 400 })
  }

  try {
    // server() 대신 직접 fetch (Set-Cookie를 얻기 위해)
    const upstream = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: tokenJson.id_token }),
      cache: 'no-store',
    })

    // 에러면 가능한 payload를 그대로 내려줌
    if (!upstream.ok) {
      const raw = await upstream.text()
      let payload = null
      try {
        payload = raw ? JSON.parse(raw) : null
      } catch {
        payload = raw ? { message: raw } : { message: `HTTP ${upstream.status}` }
      }
      return NextResponse.json(
        { ...payload, idToken: tokenJson.id_token },
        { status: upstream.status },
      )
    }

    // TODO: Set-Cookie로 내려준 accessToken/refreshToken을 꺼내기
    const setCookies: string[] =
      upstream.headers.getSetCookie?.() ?? [upstream.headers.get('set-cookie')].filter(Boolean)

    const accessToken = setCookies
      .find((sc) => sc.startsWith('accessToken='))
      ?.slice('accessToken='.length)
      .split(';', 1)[0]
    const refreshToken = setCookies
      .find((sc) => sc.startsWith('refreshToken='))
      ?.slice('refreshToken='.length)
      .split(';', 1)[0]

    if (!accessToken || !refreshToken) {
      console.error('Missing tokens in upstream Set-Cookie:', setCookies)
      return NextResponse.json({ message: 'Missing tokens in Set-Cookie' }, { status: 502 })
    }

    const res = NextResponse.json({ success: true })

    res.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: ACCESS_TOKEN_SAME_SITE,
      path: ACCESS_TOKEN_PATH,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    })

    res.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: REFRESH_TOKEN_SAME_SITE,
      path: REFRESH_TOKEN_PATH,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    })

    const upstreamJson = await upstream.json()

    // TODO 권한 이거 이렇게 주니까 여기서 처리해야하는데 로직을 어떻게 할지 다시 생각 (리프레쉬랑 같게 공급)
    res.cookies.set('role', upstreamJson.role, {
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
      return NextResponse.json(payload, { status: error.status })
    }

    console.error('Unhandled error in /api/signin:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
