import React from 'react'
import TrackFormBase from '@/features/(authenticated)/admin/root/components/track/TrackFormBase'
import { createTrackAction } from '@/features/(authenticated)/admin/track/actions/createTrack'
import { initialState } from '@/features/(authenticated)/admin/root/components/track/TrackFiled'

export default function TrackCreate() {
  return <TrackFormBase mode="create" action={createTrackAction} initial={initialState()} />
}
