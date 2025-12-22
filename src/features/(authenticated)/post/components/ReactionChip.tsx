'use client'

type ReactionChipProps = {
  emoji: string
  count: number
  pressed?: boolean
  onClick?: () => void
  disabled?: boolean
}

export function ReactionChip({ emoji, count, pressed, onClick, disabled }: ReactionChipProps) {
  const stateClass = pressed
    ? 'border-[rgba(46,47,51,0.28)] bg-[rgba(46,47,51,0.06)]'
    : 'border-[rgba(112,115,124,0.22)]'

  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
      disabled={disabled}
      className={`box-border flex h-[38px] shrink-0 cursor-pointer items-center gap-[6px] rounded-[10px] border bg-white px-3 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${stateClass}`}
    >
      <span className="text-[16px] leading-6">{emoji}</span>
      <span className="text-[14px] leading-5 text-[rgba(46,47,51,0.88)]">{count}</span>
    </button>
  )
}
