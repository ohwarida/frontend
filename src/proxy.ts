import { NextRequest, NextResponse } from 'next/server'

// 로그인 없이 접근 허용할 경로들만 정의
const PUBLIC_PATHS = ['/signin', '/signup', '/pending']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 정적 파일, Next 내부 리소스는 건드리지 않기
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  // 쿠키에서 access_token 읽기
  const accessToken = request.cookies.get('access_token')?.value

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
  const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup')

  if (accessToken) {
    // 로그인된 상태에서는 /signin, /signup 못 들어가게 막기
    if (isAuthPage) {
      const redirectUrl = new URL('/job-tips', request.url) // 기본 진입 페이지
      return NextResponse.redirect(redirectUrl)
    }

    // 그 외 경로는 그대로 통과
    return NextResponse.next()
  }

  // (public) 경로는 누구나 접근 가능 ->  그대로 통과
  if (isPublicPath) {
    return NextResponse.next()
  }

  // 나머지(= (authenticated) 쪽)는 전부 로그인 필요 -> /signin으로
  const loginUrl = new URL('/signin', request.url)
  loginUrl.searchParams.set('redirect', pathname) // 로그인 후 돌아갈 곳

  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    // api, _next/static, _next/image, 일부 정적 파일 제외
    // (공식 문서의 예시 패턴을 기반으로 확장한 버전)
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$).*)',
  ],
}
