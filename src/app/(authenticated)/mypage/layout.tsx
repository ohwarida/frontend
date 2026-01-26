import React from 'react'
import AppShell from '@/components/layout/header/AppShell'
import Main from '@/components/layout/Main'
import { AsideMyPage } from '@/components/layout/aside/AsideMyPage'
import { MyPageHeader } from '@/features/(authenticated)/mypage/components/MyPageHeader'

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell location="mypage">
      <Main>
        <AsideMyPage />
        <section className="w-full bg-white lg:bg-transparent">
          <div className="lg:hidden">
            <MyPageHeader />
          </div>

          {children}
        </section>
      </Main>
    </AppShell>
  )
}
