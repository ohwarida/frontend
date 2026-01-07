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
import AdminCheckBox from '@/features/(authenticated)/admin/root/components/AdminCheckBox'
import AdminSelectAllCheckBox from '@/features/(authenticated)/admin/root/components/AdminSelectAllCheckBox'
import AdminAllButton from '@/features/(authenticated)/admin/root/components/AdminAllButton'

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
  const page = Math.max(1, Number(sp.page ?? '1') || 1)
  const size = Math.min(100, Math.max(1, Number(sp.size ?? '10') || 10))
  const userData = await getUserList({
    page,
    size,
    trackId: Number(trackId),
    sort: ['createdAt,desc'],
  })
  const trackData = await getTrackList(true)
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
  const selectableIds = rows.map((r) => r.userId)

  return (
    <>
      <AdminPageButton tabs={TABS} />

      <div className="h-full w-full pt-4">
        <div className="rounded-md border border-gray-200 bg-white">
          <div className="flex items-end justify-between gap-4 p-6">
            <div>
              <h1 className="text-2xl">관리자 페이지</h1>
              <div className="mt-1 flex items-center justify-start gap-5">
                <p>전체 ({rows.length}명)</p>
                <p>승인 대기 ({}명)</p>
                <p>승인 완료 ({}명)</p>
              </div>
            </div>
            <div>
              <AdminAllButton trackId={Number(trackId)} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <colgroup>
                <col className="w-6" />
                <col className="w-14" />
                <col className="w-28" />
                <col className="w-36" />
                <col className="w-56" />
                <col className="w-24" />
                <col className="w-28" />
                <col className="w-28" />
                <col className="w-10" />
              </colgroup>
              <thead className="bg-gray-100 px-6">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                    <AdminSelectAllCheckBox ids={selectableIds} />
                  </th>

                  {['번호', '이름', '전화번호', '이메일', '가입일', '역할', '상태', '관리'].map(
                    (h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-600">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-10 text-center text-sm text-gray-500">
                      현재 승인 대기 중인 사용자가 없습니다.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, index) => {
                    const isAdmin = r.role === 'ADMIN'
                    const approveDisabled = normalizeReq(r.requestStatus) === 'ACCEPTED'
                    const rejectDisabled = normalizeReq(r.requestStatus) === 'REJECTED'
                    const no = (page - 1) * size + index + 1

                    return (
                      <tr
                        key={r.userId}
                        className={clsx(
                          'border-gray-100 hover:bg-gray-50/50',
                          index === rows.length - 1 ? '' : 'border-b',
                        )}
                      >
                        <td>
                          <AdminCheckBox id={r.userId} />
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-900">{no}</td>
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
                                variant="warning"
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
