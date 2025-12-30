import 'server-only'
import { cookies } from 'next/headers'

type CookieSetOptions = Parameters<Awaited<ReturnType<typeof cookies>>['set']>[2]

function parseSetCookie(
  sc: string,
): { name: string; value: string; options: CookieSetOptions } | null {
  const parts = sc.split(';').map((s) => s.trim())
  const [nameValue, ...attrs] = parts

  const eq = nameValue.indexOf('=')
  if (eq < 0) return null

  const name = nameValue.slice(0, eq)
  const value = nameValue.slice(eq + 1)

  const options: CookieSetOptions = {}

  for (const a of attrs) {
    const [rawK, ...rest] = a.split('=')
    const k = rawK.toLowerCase()
    const v = rest.join('=') // Expires 등에 '='가 들어가는 경우 대비

    if (k === 'path') options.path = v || '/'
    else if (k === 'domain') options.domain = v
    else if (k === 'max-age') {
      const n = Number(v)
      if (!Number.isNaN(n)) options.maxAge = n
    } else if (k === 'expires') {
      const d = new Date(v)
      if (!Number.isNaN(d.getTime())) options.expires = d
    } else if (k === 'samesite') {
      const s = v?.toLowerCase()
      if (s === 'lax') options.sameSite = 'lax'
      else if (s === 'strict') options.sameSite = 'strict'
      else if (s === 'none') options.sameSite = 'none'
    } else if (k === 'secure') options.secure = true
    else if (k === 'httponly') options.httpOnly = true
  }

  return { name, value, options }
}

export async function applySetCookies(setCookies: string[]) {
  const cookieStore = await cookies()
  for (const sc of setCookies) {
    const parsed = parseSetCookie(sc)
    if (!parsed) continue
    cookieStore.set(parsed.name, parsed.value, parsed.options)
  }
}
