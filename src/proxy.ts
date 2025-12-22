import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/features/(authenticated)/users/apis/user.api'

// 로그인 없이 접근 허용할 경로들
const PUBLIC_PATHS = ['/signin', '/signup']
const DEFAULT_AFTER_LOGIN = '/job-tips'

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

  const refreshToken = request.cookies.get('refresh_token')?.value
  let user
  try {
    user = refreshToken ? await getUser() : null
  } catch (e) {
    user = null
  }
  const isAuthed = !!user

  // 로그인 상태에서 /signin, /signup 접근하면 기본 페이지로 보내기 (이것도 인식 맞지?)
  if (isAuthPage && isAuthed) {
    return NextResponse.redirect(new URL(DEFAULT_AFTER_LOGIN, request.url))
  }

  // public은 항상 통과 (인식 맞지?)
  if (isPublicPath) {
    return NextResponse.next()
  }

  // 내 생각에 user 있으면 public 이고 만약아닐 시에도 걍 통과 슈연님이 보고 판단 ㄱ
  if (isAuthed) {
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
