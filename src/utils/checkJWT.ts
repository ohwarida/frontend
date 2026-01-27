export function isAccessTokenExpiringSoon(token?: string | null, thresholdSec = 120): boolean {
  if (!token) return true

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true

    const payloadJson = base64UrlDecode(parts[1])
    const payload = JSON.parse(payloadJson) as { exp?: number }

    if (typeof payload.exp !== 'number') return true

    const nowSec = Math.floor(Date.now() / 1000)
    const secondsLeft = payload.exp - nowSec

    return secondsLeft <= thresholdSec
  } catch {
    return true
  }
}

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')

  if (typeof atob === 'function') {
    const bin = atob(padded)
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  }

  return Buffer.from(padded, 'base64').toString('utf-8')
}
