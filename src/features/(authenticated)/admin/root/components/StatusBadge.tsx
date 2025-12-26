import clsx from 'clsx'

type StatusUpper = 'ACTIVE' | 'BLOCKED' | 'EXPIRED'
type StatusLower = Lowercase<StatusUpper>
type Status = StatusUpper | StatusLower

function normalizeStatus(status: string): StatusUpper | 'unknown' {
  const s = status.trim().toUpperCase()
  if (s === 'ACTIVE' || s === 'BLOCKED' || s === 'EXPIRED') return s
  return 'unknown'
}

function getStatusBadge(status: string) {
  const s = normalizeStatus(status)

  switch (s) {
    case 'ACTIVE':
      return { label: '활성', className: 'bg-green-100 text-green-700' }
    case 'BLOCKED':
      return { label: '차단', className: 'bg-red-100 text-red-700' }
    case 'EXPIRED':
      return { label: '만료', className: 'bg-gray-100 text-gray-600' }
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
