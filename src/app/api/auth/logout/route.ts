import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const clearAuthCookies = (res: NextResponse) => {
  res.cookies.delete(ACCESS_TOKEN)
  res.cookies.delete(REFRESH_TOKEN)
}

// 세션 만료/리프레시 실패 시 fallback.
export async function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get('next') || '/signin'
  const res = NextResponse.redirect(new URL(next, req.url))
  clearAuthCookies(res)
  res.headers.set('Cache-Control', 'no-store')
  return res
}

export async function DELETE(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value
  try {
    await fetch(`${API_BASE}/api/v1/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: 'no-store',
    })
  } catch {
    // ignore: 서버 죽었거나 타임아웃이어도 쿠키는 지우고 로그아웃 처리
  }
  const res = NextResponse.json({ success: true })
  clearAuthCookies(res)
  return res
}
