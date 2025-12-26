import React from 'react'
import AppShell from '@/components/layout/header/AppShell'
import Main from '@/components/layout/Main'
import AdminPageButton from '@/features/(authenticated)/admin/root/components/AdminPageButton'
import { getTrackList } from '@/features/(authenticated)/admin/track/services/getTrackList'

export default async function AdminLayout({
  children,
  track,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
  track: React.ReactNode
}) {
  return (
    <AppShell location="admin">
      <Main>
        <section className="w-full">
          {track}
          <div className="pt-4">{children}</div>
        </section>
      </Main>
      {modal}
    </AppShell>
  )
}
