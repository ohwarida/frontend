import React from 'react'
import AppShell from '@/components/layout/header/AppShell'
import Main from '@/components/layout/Main'

export default async function AdminLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <AppShell location="admin">
      <Main>
        <div className="w-full">{children}</div>
      </Main>
      {modal}
    </AppShell>
  )
}
