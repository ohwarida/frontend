import React from 'react'
import AppShell from '@/components/layout/header/AppShell'
import Main from '@/components/layout/Main'
import AdminPageButton from '@/features/(authenticated)/admin/root/components/AdminPageButton'
import { getTrackList } from '@/features/(authenticated)/admin/track/services/getTrackList'
import { TrackFields } from '@/store/trackButton.store'

export default async function AdminLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const trackData = await getTrackList()
  const TABS: TrackFields[] = [
    // TODO: 백엔드와 상의 필요
    {
      trackId: 'operator',
      trackName: '운영자',
    },
    ...(trackData?.content?.length > 0
      ? trackData.content.map((track) => ({
          trackId: String(track.trackId),
          endDate: track.endDate,
          startDate: track.startDate,
          trackStatus: track.trackStatus,
          trackName: track.trackName,
        }))
      : []),
  ]

  return (
    <AppShell location="admin">
      <Main>
        <section className="w-full">
          <AdminPageButton tabs={TABS} />
          <div className="pt-4">{children}</div>
        </section>
      </Main>
      {modal}
    </AppShell>
  )
}
