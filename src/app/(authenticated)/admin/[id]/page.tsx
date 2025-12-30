import type { Metadata } from 'next'
import clsx from 'clsx'
import StatusBadge from '@/features/(authenticated)/admin/root/components/StatusBadge'
import Pagination from '@/components/ui/Pagination'
import { getUserList } from '@/features/(authenticated)/admin/root/services/getUserList'
import ActionButton from '@/features/(authenticated)/admin/root/components/ActionButton'
import ActionSelect from '@/features/(authenticated)/admin/root/components/ActionSelect'
import { RequestStatus } from '@/features/(authenticated)/admin/root/types/AdminPage.types'
import { getTrackList } from '@/features/(authenticated)/admin/track/services/getTrackList'
import { TrackField } from '@/store/trackButton.store'
import AdminPageButton from '@/features/(authenticated)/admin/root/components/AdminPageButton'

export const metadata: Metadata = {
  title: '관리자 모드 | Wanted Ground PotenUp',
  description: '학생들을 관리하는 페이지입니다.',
}

type PageParams = Promise<{ id: string }>
type PageSearchParams = Promise<{ page?: string; size?: string }>

export default async function Page({
  params,
  searchParams,
}: {
  params: PageParams
  searchParams: PageSearchParams
}) {
  const { id: trackId } = await params
  const sp = await searchParams
  const page = Math.max(0, Number(sp.page ?? '0') || 0)
  const size = Math.min(100, Math.max(1, Number(sp.size ?? '20') || 20))
  const userData = await getUserList({
    page,
    size,
    trackId: Number(trackId),
    sort: ['createdAt,desc'],
  })
  const trackData = await getTrackList()
  const TABS: TrackField[] =
    trackData?.content?.length > 0
      ? trackData.content.map((track) => ({
          trackId: track.trackId,
          endDate: track.endDate,
          startDate: track.startDate,
          trackStatus: track.trackStatus,
          trackName: track.trackName,
        }))
      : []

  const rows = userData.content

  return (
    <>
      <AdminPageButton tabs={TABS} />

      <div className="h-full w-full pt-4">
        <div className="rounded-md border border-gray-200 bg-white">
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-2xl">관리자 페이지</h1>
            <p>회원 가입 승인 대기 목록 (인원 수)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 px-6">
                <tr className="border-b border-gray-200">
                  {['번호', '이름', '전화번호', '이메일', '가입일', '역할', '상태', '관리'].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-gray-500">
                      현재 승인 대기 중인 사용자가 없습니다.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, index) => {
                    const isAdmin = r.role === 'ADMIN'

                    const approveDisabled = normalizeReq(r.requestStatus) === 'ACCEPTED'
                    const rejectDisabled = normalizeReq(r.requestStatus) === 'REJECTED'

                    return (
                      <tr
                        key={r.userId}
                        className={clsx(
                          'border-gray-100 hover:bg-gray-50/50',
                          index === rows.length - 1 ? '' : 'border-b',
                        )}
                      >
                        <td className="px-6 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-3 text-sm text-gray-900">{r.name}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{r.phoneNumber}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{r.email ?? '-'}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {new Date(r.createdAt).toISOString().slice(0, 10).replaceAll('-', '.')}
                        </td>

                        <td className="px-6 py-3">
                          {isAdmin ? (
                            <p className="text-sm text-gray-700">관리자</p>
                          ) : (
                            <ActionSelect initialRole={r.role} userId={r.userId} />
                          )}
                        </td>

                        <td className="px-6 py-3">
                          {isAdmin ? (
                            <p className="text-sm text-gray-700">-</p>
                          ) : (
                            <StatusBadge status={r.status} />
                          )}
                        </td>

                        <td className="px-6 py-3">
                          {isAdmin ? (
                            <p className="text-sm text-gray-700">-</p>
                          ) : (
                            <div className="flex items-center gap-2">
                              <ActionButton
                                trackId={Number(trackId)}
                                disabled={approveDisabled}
                                variant="add"
                                initialRole={r.role}
                                userId={r.userId}
                                requestStatus="ACCEPTED"
                                content="승인"
                              />
                              <ActionButton
                                trackId={Number(trackId)}
                                disabled={rejectDisabled}
                                variant="cancel"
                                initialRole={r.role}
                                userId={r.userId}
                                requestStatus="REJECTED"
                                content="거절"
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          <Pagination meta={userData.pageInfo} searchParams={sp} />
        </div>
      </div>
    </>
  )
}

export function normalizeReq(v: string): RequestStatus | 'unknown' {
  const s = v.trim().toUpperCase()
  if (s === 'ACCEPTED' || s === 'PENDING' || s === 'REJECTED') return s
  return 'unknown'
}
