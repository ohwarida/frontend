import React from 'react'
import AppShell from '@/components/layout/header/AppShell'
import PageButton from '@/components/layout/PageButton'
import Main from '@/components/layout/Main'

const TABS = [
  { id: 'FE1', label: 'FE 1기' },
  { id: 'UNREAL_GAME', label: '언리얼 게임 개발' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell location="admin">
      <Main>
        <section className="w-full">
          <PageButton TABS={TABS} />
          <div className="pt-4">{children}</div>
        </section>
      </Main>
    </AppShell>
  )
}
