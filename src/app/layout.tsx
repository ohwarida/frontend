import type { Metadata } from 'next'
import React from 'react'
import '@/app/globals.css'
import ReactQueryProvider from '@/app/_providers/ReactQueryProvider'
import { suit } from '@/font/suit/font'

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
    <html lang="ko" className={suit.className}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
