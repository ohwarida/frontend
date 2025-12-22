'use client'

import type { ReactionType, Reaction } from '../types/Post.types'
import { ReactionChip } from './ReactionChip'

export function Reaction({
  reactions = [],
  onToggle,
}: {
  reactions?: Reaction[]
  onToggle?: (reactionType: ReactionType) => void
}) {
  const chips = REACTION_META.map((m) => {
    const found = reactions.find((r) => r.reactionType === m.reactionType)
    return {
      ...m,
      count: found?.count ?? 0,
      reactedByMe: found?.reactedByMe ?? false,
    }
  })

  const totalReactions = chips.reduce((sum, c) => sum + c.count, 0)

  return (
    <section aria-label="리액션" className="flex items-center gap-3">
      <ul className="flex items-center gap-3">
        {chips.map((c) => (
          <li key={c.reactionType}>
            <ReactionChip
              emoji={c.emoji}
              count={c.count}
              pressed={c.reactedByMe}
              onClick={onToggle && (() => onToggle(c.reactionType))}
            />
          </li>
        ))}
      </ul>

      <p className="text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]">
        {totalReactions} reactions
      </p>
    </section>
  )
}

const REACTION_META = [
  { reactionType: 'LIKE', emoji: '👍' },
  { reactionType: 'HEART', emoji: '❤️' },
  { reactionType: 'SMILE', emoji: '😊' },
] as const satisfies ReadonlyArray<{ reactionType: ReactionType; emoji: string }>
