import SignupForm from '@/features/(public)/signup/components/SignupForm'
import { getTrackList } from '@/features/(authenticated)/admin/track/services/getTrackList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '회원 가입 | Wanted Ground PotenUp',
  description: '업계 트렌드와 이슈를 공유하고 정리하는 트렌드 게시판에 환영합니다.',
}

export default async function SignupPage() {
  const trackData = await getTrackList(false)
  const selectTrack =
    trackData?.content?.length > 0
      ? trackData.content.map((track) => ({
          label: track.trackName,
          value: String(track.trackId),
        }))
      : []

  return (
    <div className="mx-auto flex min-h-full max-w-sm flex-col justify-center px-4">
      <div className="rounded-3xl bg-white/90 px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.14)] ring-1 ring-black/5 backdrop-blur">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-gray-50 ring-1 ring-black/5">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">추가 정보 입력</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            구글 계정으로 기본 인증은 완료되었습니다. 서비스 이용을 위해 아래 정보를 마저
            입력해주세요.
          </p>
        </div>
        <SignupForm provider="GOOGLE" selectTrack={selectTrack} />

        <p className="mx-auto mt-3 w-72 text-center text-xs leading-5 text-gray-400">
          회원가입을 진행하면 이용약관과 개인정보처리방침을 동의한 것으로 간주됩니다.
        </p>
      </div>
      <div className="mt-6 space-y-5 px-2">
        <div className="flex items-start gap-3 text-xs text-gray-700">
          <span className="mt-0.5">✨</span>
          <div>
            <p className="font-medium">실시간 개발 트렌드</p>
            <p className="mt-0.5 text-gray-500">최신 기술과 트렌드를 가장 먼저 만나보세요</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-xs text-gray-700">
          <span className="mt-0.5">💬</span>
          <div>
            <p className="font-medium">커뮤니티 Q&A</p>
            <p className="mt-0.5 text-gray-500">
              개발 중 막히는 부분을 빠르게 질문하고 답변받으세요
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-xs text-gray-700">
          <span className="mt-0.5">🎯</span>
          <div>
            <p className="font-medium">취업 & 커리어 정보</p>
            <p className="mt-0.5 text-gray-500">포트폴리오부터 면접 팁까지 공유하세요</p>
          </div>
        </div>
      </div>
    </div>
  )
}
