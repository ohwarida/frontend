import React from 'react'
import AdminPageButton from '@/features/(authenticated)/admin/root/components/AdminPageButton'
import { getTrackList } from '@/features/(authenticated)/admin/track/services/getTrackList'
import TrackFiled from '@/features/(authenticated)/admin/root/components/TrackFiled'

export default async function Default() {
  const trackData = await getTrackList()
  const TABS = [
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
    <>
      <div className="relative w-full">
        <nav className="flex h-[48px] w-[calc(100%-130px)] items-end gap-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AdminPageButton tabs={TABS} />
        </nav>
      </div>

      <TrackFiled />
    </>
  )
}
