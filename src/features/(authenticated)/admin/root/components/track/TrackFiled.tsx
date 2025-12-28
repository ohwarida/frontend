'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { TrackFields, useTrackButtonStore } from '@/store/trackButton.store'
import TrackCreate from '@/features/(authenticated)/admin/root/components/track/TrackCreate'
import TrackEdit from '@/features/(authenticated)/admin/root/components/track/TrackEdit'
import { notFound } from 'next/navigation'

export const initialState = (
  trackName?: string,
  startDate?: string | Date,
  endDate?: string | Date,
  trackStatus?: TrackStatus,
): FormStateTypes<TrackFormTypes> => ({
  values: {
    trackName: trackName ?? '',
    startDate: startDate ?? '',
    endDate: endDate ?? '',
    trackStatus: trackStatus ?? 'GRADUATED',
  },
  fieldErrors: {},
  success: false,
})

export default function TrackFiled({ selectedTabData }: { selectedTabData: TrackFields }) {
  const pathname = usePathname()
  const store = useTrackButtonStore()

  if (pathname === '/admin/operator') return null
  // Create 전용
  if (pathname === '/admin/track') {
    return (
      <TrackCreate
        key="create"
        trackName={store.trackName ?? ''}
        startDate={store.startDate ?? ''}
        endDate={store.endDate ?? ''}
        trackStatus={store.trackStatus ?? 'GRADUATED'}
      />
    )
  }
  // 만약에 id 가 없으면 걍 null
  const seg = pathname.split('/').filter(Boolean).at(-1) ?? ''
  const idNum = Number(seg)
  if (!seg || Number.isNaN(idNum)) return null

  const trackId = store.trackId ?? selectedTabData?.trackId
  const formKey = `edit:${trackId ?? ''}`

  if (
    !selectedTabData ||
    !selectedTabData.trackName ||
    !selectedTabData.startDate ||
    !selectedTabData.endDate ||
    !selectedTabData.trackStatus
  ) {
    notFound()
  }

  return (
    <TrackEdit
      key={formKey}
      trackId={trackId}
      trackName={store.trackName ?? selectedTabData.trackName}
      startDate={store.startDate ?? selectedTabData.startDate}
      endDate={store.endDate ?? selectedTabData.endDate}
      trackStatus={store.trackStatus ?? selectedTabData.trackStatus}
    />
  )
}
