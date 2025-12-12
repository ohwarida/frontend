'use client'

import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function ReactGoogleProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) {
    console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID 가 없습니다.')
    return <>{children}</>
  }

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
}
