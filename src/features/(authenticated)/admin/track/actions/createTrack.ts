'use server'

import { redirect } from 'next/navigation'
import { server } from '@/lib/api/server'
import { revalidatePath } from 'next/cache'

export async function createTrackAction(
  prevState: FormStateTypes<TrackFormTypes>,
  formData: FormData,
): Promise<FormStateTypes<TrackFormTypes>> {
  const trackName = String(formData.get('trackName') ?? '').trim()
  const startDate = String(formData.get('startDate') ?? '').trim()
  const endDate = String(formData.get('endDate') ?? '').trim()
  const trackStatus =
    (String(formData.get('trackStatus') ?? 'ENROLLED') as TrackStatus) ?? 'ENROLLED'

  const fieldErrors: FormStateTypes<TrackFormTypes>['fieldErrors'] = {}

  if (!trackName) fieldErrors.trackName = ['트랙명을 입력해 주세요.']
  if (!startDate) fieldErrors.startDate = ['시작일을 입력해 주세요.']
  if (endDate && startDate > endDate)
    fieldErrors.endDate = ['종료일은 시작일보다 빠를 수 없습니다.']

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors, values: { trackName, startDate, endDate, trackStatus } }
  }

  const payload = { trackName, startDate, endDate, trackStatus }

  await server('/api/v1/admin/tracks', {
    method: 'POST',
    body: JSON.stringify(payload),
    cache: 'no-store',
    next: { tags: ['tracks'] },
  })

  const sp = new URLSearchParams({
    title: '트랙이 생성되었습니다.',
    message: `${startDate} ~ ${endDate} 기간의 ${trackName} 트랙이 생성되었습니다.`,
    returnTo: '/admin/operator',
  })

  revalidatePath('/admin/track')
  revalidatePath('/admin/[id]')
  redirect(`/admin/message?${sp.toString()}`)
}
