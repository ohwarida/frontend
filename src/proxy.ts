import { NextRequest, NextResponse } from 'next/server'
import { REFRESH_TOKEN } from '@/constants/token'

// 로그인 없이 접근 허용할 경로들
const PUBLIC_PATHS = ['/signin', '/signup']
const DEFAULT_AFTER_LOGIN = '/'

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const currentPath = `${pathname}${search}`

  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.match(/\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup')

  // TODO: 토큰 유효성 검사 추가
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DEFAULT_AFTER_LOGIN, request.url))
  }

  if (isPublicPath) {
    return NextResponse.next()
  }

  if (refreshToken) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/signin', request.url)
  loginUrl.searchParams.set('next', currentPath)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    // api, _next/static, _next/image, 일부 정적 파일 제외
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$).*)',
  ],
}
