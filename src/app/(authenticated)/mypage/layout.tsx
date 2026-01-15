import React from 'react'
import AppShell from '@/components/layout/header/AppShell'
import Main from '@/components/layout/Main'
import AsideMyPage from '@/components/layout/aside/AsideMyPage'

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell location="mypage">
      <Main>
        <AsideMyPage />
        <div className="w-full">{children}</div>
      </Main>
    </AppShell>
  )
}
