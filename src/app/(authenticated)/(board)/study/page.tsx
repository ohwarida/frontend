import { getTrackList } from '@/features/(authenticated)/admin/track/services/getTrackList'
import { getStudies } from '@/features/(authenticated)/post/apis/study.api'
import { StudyCardGrid } from '@/features/(authenticated)/post/components/StudyCardGrid'
import { StudyListHeader } from '@/features/(authenticated)/post/components/StudyListHeader'
import { Recruitment } from '@/features/(authenticated)/post/types/study.type'

type PageProps = {
  searchParams?: Promise<{ trackId?: string }>
}

export default async function StudyRecruitmentPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {}
  const selectedTrackId = sp.trackId ?? null

  const trackData = await getTrackList(false)
  const tracks =
    trackData?.content?.map((track) => ({
      label: track.trackName,
      value: String(track.trackId),
    })) ?? []

  const trackIdParam =
    selectedTrackId && Number.isFinite(Number(selectedTrackId))
      ? Number(selectedTrackId)
      : undefined

  const studiesRes = await getStudies({ trackId: trackIdParam })
  const studies = studiesRes.content

  // TODO: 추후에 props로 신청자 목록 넘기기
  const myRecruitments: Recruitment[] = []

  const recruitingCount = studies.filter(
    (s) => !s.isRecruitmentClosed && s.status !== 'CLOSED',
  ).length

  return (
    <div className="mx-auto flex w-full max-w-[1045px] flex-col gap-6 px-4 pb-24 sm:px-6 md:px-0 md:pb-0">
      <StudyListHeader
        recruitingCount={recruitingCount}
        tracks={tracks}
        selectedTrackId={selectedTrackId}
      />

      <StudyCardGrid items={studies} myRecruitments={myRecruitments} />
    </div>
  )
}
