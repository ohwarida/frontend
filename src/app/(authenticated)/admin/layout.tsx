import React from 'react'
import AppShell from '@/components/layout/header/AppShell'
import Main from '@/components/layout/Main'
import { safeJson, server } from '@/lib/api/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  // todo 따로 함수로 구조 하기
  const res = await server('/api/v1/auth/me')
  const data = await safeJson<{
    isAuthenticated: boolean
    role: string
    userId: number
  }>(res)

  if (!res.ok || !data?.isAuthenticated) {
    redirect(`/signin?next=/admin`)
  }
  if (data.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <AppShell location="admin">
      <Main>
        <div className="w-full">{children}</div>
      </Main>
      {modal}
    </AppShell>
  )
}
