import React from 'react'
import AppShell from '@/components/layout/header/AppShell'

export default async function PostLayout({ children }: { children: React.ReactNode }) {
  return <AppShell location="post">{children}</AppShell>
}
