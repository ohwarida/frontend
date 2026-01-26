export const formatDateDot = (input: string) => {
  if (!input) return ''
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return ''

  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')

  return `${yyyy}.${mm}.${dd}`
}
