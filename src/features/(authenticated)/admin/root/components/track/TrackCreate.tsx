import React from 'react'
import TrackFormBase from '@/features/(authenticated)/admin/root/components/track/TrackFormBase'
import { createTrackAction } from '@/features/(authenticated)/admin/track/actions/createTrack'
import { initialState } from '@/features/(authenticated)/admin/root/components/track/TrackFiled'
import { TrackFields } from '@/store/trackButton.store'

export default function TrackCreate({
  trackName,
  startDate,
  endDate,
  trackStatus,
}: {
  trackName?: TrackFields['trackName']
  startDate?: TrackFields['startDate']
  endDate?: TrackFields['endDate']
  trackStatus?: TrackFields['trackStatus']
}) {
  return (
    <TrackFormBase
      mode="create"
      action={createTrackAction}
      initial={initialState(trackName, startDate, endDate, trackStatus)}
    />
  )
}
