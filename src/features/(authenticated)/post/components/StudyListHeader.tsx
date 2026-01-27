import { HeroBanner } from './HeroBanner'
import { Toolbar } from './Toolbar'

type TrackOption = { label: string; value: string }

type StudyListHeaderProps = {
  recruitingCount: number
  tracks: TrackOption[]
  selectedTrackId?: string | null
}

export function StudyListHeader({
  recruitingCount,
  tracks,
  selectedTrackId,
}: StudyListHeaderProps) {
  const selectedTrackLabel = selectedTrackId
    ? (tracks.find((t) => t.value === selectedTrackId)?.label ?? '전체 트랙')
    : '전체 트랙'

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="relative z-0">
        <HeroBanner />
      </div>
      <Toolbar
        recruitingCount={recruitingCount}
        selectedTrackLabel={selectedTrackLabel}
        tracks={tracks}
        selectedTrackId={selectedTrackId ?? null}
      />
    </section>
  )
}
