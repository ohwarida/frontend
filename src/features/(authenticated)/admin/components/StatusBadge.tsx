import clsx from 'clsx'

type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED'
type NormalizedStatus = 'pending' | 'accepted' | 'rejected'

function normalizeStatus(status: string): NormalizedStatus | 'unknown' {
  const s = status.trim().toLowerCase()
  if (s === 'pending' || s === 'accepted' || s === 'rejected') return s
  return 'unknown'
}

function getStatusBadge(status: string) {
  const s = normalizeStatus(status)

  switch (s) {
    case 'accepted':
      return { label: '승인 완료', className: 'bg-green-100 text-green-700' }
    case 'pending':
      return { label: '승인 대기', className: 'bg-amber-100 text-amber-700' }
    case 'rejected':
      return { label: '비활성', className: 'bg-gray-100 text-gray-600' }
    default:
      return { label: '알 수 없음', className: 'bg-gray-100 text-gray-600' }
  }
}

export default function StatusBadge({ status }: { status: Status | string }) {
  const { label, className } = getStatusBadge(status)

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        className,
      )}
    >
      {label}
    </span>
  )
}
