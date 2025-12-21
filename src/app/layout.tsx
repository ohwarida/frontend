import type { Metadata } from 'next'
import React from 'react'
import '@/app/globals.css'
import { ReactQueryProvider, ReactGoogleProvider } from '@/app/_providers/_index'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: '포텐업 커뮤니티',
  description: '포텐업 커뮤니티입니다.',
}

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'block',
  weight: '100 900',
  variable: '--font-pretendard',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${pretendard.className}`}>
      <body>
        <ReactGoogleProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReactGoogleProvider>
      </body>
    </html>
  )
}
