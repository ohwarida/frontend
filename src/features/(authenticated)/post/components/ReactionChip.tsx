'use client'

type ReactionChipProps = {
  emoji: string
  count: number
  pressed?: boolean
  onClick?: () => void
  disabled?: boolean
}

export function ReactionChip({ emoji, count, pressed, onClick, disabled }: ReactionChipProps) {
  const base =
    'box-border flex h-[38px] shrink-0 items-center gap-[6px] rounded-[10px] border px-3 ' +
    'transition active:scale-[0.98] ' +
    'disabled:cursor-not-allowed disabled:opacity-50'

  const stateClass = pressed
    ? 'bg-[rgba(51,133,255,0.1)] border-[#3385FF]'
    : 'bg-white border-[rgba(112,115,124,0.22)] hover:bg-[#F7F7F8]'

  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return
        onClick?.()
      }}
      disabled={disabled}
      className={`${base} ${stateClass}`}
    >
      <span className="text-[16px] leading-6">{emoji}</span>
      <span className="text-[14px] leading-5 text-[rgba(46,47,51,0.88)]">{count}</span>
    </button>
  )
}
