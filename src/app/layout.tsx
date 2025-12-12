import type { Metadata } from 'next'
import React from 'react'
import '@/app/globals.css'
import { ReactQueryProvider, ReactGoogleProvider } from '@/app/_providers/_index'

export const metadata: Metadata = {
  title: '포텐업 커뮤니티',
  description: '포텐업 커뮤니티입니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactGoogleProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReactGoogleProvider>
      </body>
    </html>
  )
}
