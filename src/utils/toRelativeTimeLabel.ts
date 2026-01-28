const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' })

export function toRelativeTimeLabel(iso: string, now = new Date()) {
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()

  // 미래 시간이거나 파싱이 이상한 경우
  if (!Number.isFinite(diffMs) || diffMs < 0) return '방금 전'

  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return '방금 전'

  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return rtf.format(-diffMin, 'minute')

  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return rtf.format(-diffHour, 'hour')

  const diffDay = Math.floor(diffHour / 24)
  if (diffDay < 7) return rtf.format(-diffDay, 'day')

  const diffWeek = Math.floor(diffDay / 7)
  if (diffWeek < 5) return rtf.format(-diffWeek, 'week')

  const diffMonth = Math.floor(diffDay / 30)
  if (diffMonth < 12) return rtf.format(-diffMonth, 'month')

  const diffYear = Math.floor(diffDay / 365)
  return rtf.format(-diffYear, 'year')
}
