import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token'
import { isAccessTokenExpiringSoon } from '@/utils/checkJWT'

const PUBLIC_PATHS = ['/signin', '/signup']
const DEFAULT_AFTER_LOGIN = '/'

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    /\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$/.test(pathname)
  )
}

function getSetCookies(headers: Headers): string[] {
  const anyHeaders = headers
  if (typeof anyHeaders.getSetCookie === 'function') return anyHeaders.getSetCookie()
  const single = headers.get('set-cookie')
  return single ? [single] : []
}

async function tryRefresh(request: NextRequest): Promise<NextResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/auth/me`, {
    headers: {
      cookie: request.headers.get('cookie') ?? '',
    },
    cache: 'no-store',
  })

  if (!res.ok) return null

  const newCookies = getSetCookies(res.headers)
  if (newCookies.length === 0) return null

  const response = NextResponse.next()
  newCookies.forEach((c) => response.headers.append('set-cookie', c))
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const currentPath = `${pathname}${search}`

  if (isStaticAsset(pathname)) return NextResponse.next()

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup')

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value

  // accessToken이 "없거나 이미 만료"인지 판단 (임박 X)
  // thresholdSec=0 => exp <= now 이면 true
  const isMissingOrExpiredAccess = isAccessTokenExpiringSoon(accessToken, 0)

  // auth 페이지: 이미 로그인(= access 살아있음) 상태면 홈으로 보내고 싶다면
  if (isAuthPage) {
    if (!isMissingOrExpiredAccess || refreshToken) {
      return NextResponse.redirect(new URL(DEFAULT_AFTER_LOGIN, request.url))
    }
    return NextResponse.next()
  }

  if (isPublicPath) return NextResponse.next()

  if (!isMissingOrExpiredAccess) {
    return NextResponse.next()
  }

  if (refreshToken) {
    try {
      const refreshed = await tryRefresh(request)
      if (refreshed) return refreshed
    } catch (e) {
      console.error('Middleware refresh error:', e)
    }
  }

  const loginUrl = new URL('/signin', request.url)
  loginUrl.searchParams.set('next', currentPath)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$).*)',
  ],
}
