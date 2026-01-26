import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const base = process.env.NEXT_PUBLIC_API_BASE
  if (!base) return new NextResponse('NEXT_PUBLIC_API_BASE is missing', { status: 500 })

  const { path } = await params
  const joinedPath = path.join('/')

  const url = new URL(req.url)
  const upstream = `${base}/${joinedPath}${url.search}`

  const res = await fetch(upstream, {
    method: 'GET',
    cache: 'no-store',
  })

  if (!res.ok) {
    return new NextResponse(await res.text(), { status: res.status })
  }

  return new NextResponse(res.body, {
    status: 200,
    headers: {
      'Content-Type': res.headers.get('Content-Type') ?? 'application/octet-stream',
      'Cache-Control': res.headers.get('Cache-Control') ?? 'no-store',
    },
  })
}
