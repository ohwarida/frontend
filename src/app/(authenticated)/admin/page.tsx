import type { Metadata } from 'next'
import clsx from 'clsx'
import StatusBadge from '@/features/(authenticated)/admin/components/StatusBadge'
import Select from '@/components/ui/Select'
import Pagination from '@/components/ui/Pagination'
import { getUserList } from '@/features/(authenticated)/admin/services/getUserList'
import ActionButton from '@/features/(authenticated)/admin/components/ActionButton'
import ActionSelect from '@/features/(authenticated)/admin/components/ActionSelect'

export const metadata: Metadata = {
  title: '관리자 모드 | Wanted Ground PotenUp',
  description: '학생들을 관리하는 페이지입니다.',
}

type PageSearchParams = Promise<{
  page?: string
  size?: string
}>

export default async function Page({ searchParams }: { searchParams: PageSearchParams }) {
  const sp = await searchParams
  const page = Math.max(0, Number(sp.page ?? '0') || 0)
  const size = Math.min(100, Math.max(1, Number(sp.size ?? '20') || 20))
  const data = await getUserList({
    page,
    size,
    sort: ['createdAt,desc'],
  })
  const rows = data.content

  return (
    <div className="h-full w-full">
      <div className="rounded-md border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 p-6">
          <h1 className="text-2xl">관리자 페이지</h1>
          <p>회원 가입 승인 대기 목록 (인원 수)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                {['번호', '이름', '전화번호', '이메일', '가입일', '역할', '상태', '관리'].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <p className="">현재 승인 대기 중인 사용자가 없습니다.</p>
              ) : (
                rows.map((r, index) => {
                  const approveDisabled = r.requestStatus === 'ACCEPTED'
                  const pendingDisabled = r.requestStatus === 'PENDING'
                  const rejectedDisabled = r.requestStatus === 'REJECTED'

                  return (
                    <tr
                      key={r.userId}
                      className={clsx(
                        'border-gray-100 hover:bg-gray-50/50',
                        index === rows.length - 1 ? '' : 'border-b',
                      )}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.phoneNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.email ?? '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(r.createdAt).toISOString().slice(0, 10).replaceAll('-', '.')}
                      </td>

                      <td className="px-4 py-3">
                        <ActionSelect
                          initialRole={r.role}
                          userId={r.userId}
                          disabled={approveDisabled}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={r.requestStatus} />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ActionButton
                            variant="add"
                            initialRole={r.role}
                            userId={r.userId}
                            status="ACCEPTED"
                            disabled={approveDisabled}
                            content="승인"
                          />

                          <ActionButton
                            variant="cancel"
                            initialRole={r.role}
                            userId={r.userId}
                            status="REJECTED"
                            disabled={rejectedDisabled}
                            content="취소"
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={data.number}
          size={data.size}
          totalPages={data.totalPages}
          searchParams={sp}
        />
      </div>
    </div>
  )
}
