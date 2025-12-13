import { NextRequest, NextResponse } from 'next/server'

// 로그인 없이 접근 허용할 경로들
const PUBLIC_PATHS = ['/signin', '/signup', '/pending']
// 로그인 상태에서 들어가면 기본으로 보내줄 페이지
const DEFAULT_AFTER_LOGIN = '/job-tips'
const REFRESH_ROUTE = '/api/auth/refresh'

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const currentPath = `${pathname}${search}` // 쿼리까지 포함해서 돌아가기

  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.match(/\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  const hasAccess = Boolean(accessToken)
  const hasRefresh = Boolean(refreshToken)

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup')

  /**
   *   /signin, /signup 접근 처리
   * - access 있으면: 이미 로그인 → 기본 페이지로
   * - access 없고 refresh만 있으면: 세션 복구 시도 → refresh 라우트로 보내고 복구되면 기본 페이지로
   * - 둘 다 없으면: 그대로 페이지 접근
   */
  if (isAuthPage) {
    if (hasAccess) {
      return NextResponse.redirect(new URL(DEFAULT_AFTER_LOGIN, request.url))
    }

    if (hasRefresh) {
      const u = new URL(REFRESH_ROUTE, request.url)
      u.searchParams.set('next', DEFAULT_AFTER_LOGIN)
      return NextResponse.redirect(u)
    }

    return NextResponse.next()
  }

  if (isPublicPath) {
    return NextResponse.next()
  }

  /**
   * 보호 경로 접근 처리
   * - access 있으면 통과
   * - access 없고 refresh 있으면: 세션 복구 시도 (refresh → access 재발급) 후 원래 페이지로
   * - 둘 다 없으면 signin으로
   */
  if (hasAccess) {
    return NextResponse.next()
  }

  if (hasRefresh) {
    const u = new URL(REFRESH_ROUTE, request.url)
    u.searchParams.set('next', currentPath)
    return NextResponse.redirect(u)
  }

  const loginUrl = new URL('/signin', request.url)
  loginUrl.searchParams.set('redirect', currentPath)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    // api, _next/static, _next/image, 일부 정적 파일 제외
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$).*)',
  ],
}
