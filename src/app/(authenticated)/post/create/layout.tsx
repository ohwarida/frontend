import React from 'react'
import AppShell from '@/components/layout/header/AppShell'

export default async function PostCreateLayout({ children }: { children: React.ReactNode }) {
  return <AppShell location="post/create">{children}</AppShell>
}
