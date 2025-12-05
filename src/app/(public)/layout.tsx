import React from 'react'
import Header from '@/components/layout/header/Header'
import Background from '@/components/Background'
import Footer from '@/components/layout/Footer'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden">
      <Background />
      <div className="relative z-10 flex min-h-dvh flex-col">
        <Header layoutType="public">
          <div className="flex flex-1 items-center justify-end">
            <button>로그인</button>
          </div>
        </Header>
        <main className="h-full pt-20">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
