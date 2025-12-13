const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token' as const

export async function exchangeGoogleAuthCode(code: string) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth 환경 변수가 설정되지 않았습니다.')
  }

  const params = new URLSearchParams()
  params.append('code', code)
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('redirect_uri', 'postmessage')
  params.append('grant_type', 'authorization_code')

  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    cache: 'no-store',
  })

  if (!tokenRes.ok) {
    const errorBody = await tokenRes.text()
    throw new Error(`Google token request failed: ${tokenRes.status} ${errorBody}`)
  }

  const tokenJson = await tokenRes.json()
  return tokenJson
}
