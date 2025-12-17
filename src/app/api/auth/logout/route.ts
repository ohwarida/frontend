import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const clearAuthCookies = (res: NextResponse) => {
  res.cookies.delete('access_token')
  res.cookies.delete('refresh_token')
}

export async function DELETE(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value
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
