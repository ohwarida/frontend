import React from 'react'
import AppShell from '@/components/layout/header/AppShell'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell location="content">{children}</AppShell>
}
