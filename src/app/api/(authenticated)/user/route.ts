import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function getSetCookies(upstream: Response): string[] {
  const h = upstream.headers
  if (typeof h.getSetCookie === 'function') return h.getSetCookie()
  const single = upstream.headers.get('set-cookie')
  return single ? [single] : []
}

export async function GET(req: NextRequest) {
  const base = process.env.NEXT_PUBLIC_API_BASE
  if (!base) {
    return NextResponse.json({ errorMessage: 'API BASE 환경변수가 없습니다.' }, { status: 500 })
  }

  const upstream = await fetch(`${base}/api/v1/users/myInfo`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      // TODO: 들어온 쿠키를 백엔드로 그대로 전달 (인증 필수)
      cookie: req.headers.get('cookie') ?? '',
    },
  })

  const raw = await upstream.text()
  let payload
  try {
    payload = raw ? JSON.parse(raw) : null
  } catch {
    payload = raw ? { message: raw } : null
  }

  const res = NextResponse.json(
    upstream.ok
      ? payload
      : { errorMessage: `유저 조회 실패: ${payload?.message ?? `HTTP ${upstream.status}`}` },
    { status: upstream.status },
  )

  for (const sc of getSetCookies(upstream)) {
    res.headers.append('set-cookie', sc)
  }

  return res
}
