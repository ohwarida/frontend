import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  const base = process.env.NEXT_PUBLIC_API_BASE
  const joinedPath = params.path.join('/')

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
