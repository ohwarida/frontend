import { NextRequest, NextResponse } from 'next/server'
import { exchangeGoogleAuthCode } from '@/lib/o-auth/google'
import { HttpErrorTypes } from '@/types/HttpError.types'

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
      let payload
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

    const setCookies: string[] =
      upstream.headers.getSetCookie?.() ??
      ([upstream.headers.get('set-cookie')].filter(Boolean) as string[])

    const hasAccess = setCookies.some((sc) => /^accessToken=/.test(sc))
    const hasRefresh = setCookies.some((sc) => /^refreshToken=/.test(sc))

    if (!hasAccess || !hasRefresh) {
      return NextResponse.json({ message: 'Missing tokens in Set-Cookie' }, { status: 502 })
    }

    const res = NextResponse.json({ success: true }, { status: upstream.status })

    for (const sc of setCookies) {
      res.headers.append('set-cookie', sc)
    }

    return res
  } catch (error) {
    if (error instanceof HttpErrorTypes) {
      const payload =
        typeof error.body === 'object' && error.body !== null
          ? error.body
          : { message: error.message }
      return NextResponse.json(payload, { status: error.status })
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
