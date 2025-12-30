import TrackFormBase from '@/features/(authenticated)/admin/root/components/track/TrackFormBase'
import { updateTrackAction } from '@/features/(authenticated)/admin/track/actions/updateTrack'
import React from 'react'
import { initialState } from '@/features/(authenticated)/admin/root/components/track/TrackFiled'
import { TrackField } from '@/store/trackButton.store'

export default function TrackEdit({
  trackId,
  trackName,
  startDate,
  endDate,
  trackStatus,
}: {
  trackId?: TrackField['trackId']
  trackName?: TrackField['trackName']
  startDate?: TrackField['startDate']
  endDate?: TrackField['endDate']
  trackStatus?: TrackField['trackStatus']
}) {
  const trackIdNum = Number(trackId)
  if (!trackId || Number.isNaN(trackIdNum)) return null
  if (trackId === 1) return null
  return (
    <TrackFormBase
      mode="edit"
      action={updateTrackAction.bind(null, trackIdNum)}
      initial={initialState(trackName, startDate, endDate, trackStatus)}
    />
  )
}
