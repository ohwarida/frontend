import TrackFormBase from '@/features/(authenticated)/admin/root/components/track/TrackFormBase'
import { updateTrackAction } from '@/features/(authenticated)/admin/track/actions/updateTrack'
import React from 'react'
import { initialState } from '@/features/(authenticated)/admin/root/components/track/TrackFiled'
import { TrackFields } from '@/store/trackButton.store'

export default function TrackEdit({
  trackId,
  trackName,
  startDate,
  endDate,
  trackStatus,
}: {
  trackId?: TrackFields['trackId']
  trackName?: TrackFields['trackName']
  startDate?: TrackFields['startDate']
  endDate?: TrackFields['endDate']
  trackStatus?: TrackFields['trackStatus']
}) {
  const trackIdNum = Number(trackId)
  if (!trackId || Number.isNaN(trackIdNum)) return null
  return (
    <TrackFormBase
      mode="edit"
      action={updateTrackAction.bind(null, trackIdNum)}
      initial={initialState(trackName, startDate, endDate, trackStatus)}
    />
  )
}
