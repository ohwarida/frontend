import { NextRequest, NextResponse } from 'next/server'

type RefreshResponse = {
  accessToken: string
  refreshToken?: string
}

export async function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get('next') ?? '/'
  const refreshToken = req.cookies.get('refresh_token')?.value

  if (!refreshToken) {
    return redirectToSigninAndClearCookies(req, next)
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE!}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.redirect(new URL(`/signin?next=${encodeURIComponent(next)}`, req.url))
    }

    const data = (await response.json()) as RefreshResponse

    const res = NextResponse.redirect(new URL(next, req.url))

    res.cookies.set('access_token', data.accessToken)

    return res
  } catch {
    return redirectToSigninAndClearCookies(req, next)
  }
}

const redirectToSigninAndClearCookies = (req: NextRequest, next: string) => {
  const res = NextResponse.redirect(new URL(`/signin?next=${encodeURIComponent(next)}`, req.url))
  res.cookies.delete('access_token')
  res.cookies.delete('refresh_token')
  return res
}
