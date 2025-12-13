import React from 'react'
import Aside from '@/components/layout/aside/Aside'
import PageButton from '@/components/layout/PageButton'
import Main from '@/components/layout/Main'
import AppShell from '@/components/layout/header/AppShell'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell location="board">
      <Main>
        <Aside />

        <section className="w-full">
          <PageButton />
          <div className="pt-4">{children}</div>
        </section>
      </Main>
    </AppShell>
  )
}
