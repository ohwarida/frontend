'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { ReactionType, Reaction } from '../types/Reaction.types'
import { ReactionChip } from './ReactionChip'
import { postKeys } from '../queries/postQueryOption'

export function Reaction({
  reactions = [],
  onToggle,
  invalidatePostList = true,
}: {
  reactions?: Reaction[]
  onToggle?: (reactionType: ReactionType, reactedByMe: boolean) => Promise<void> | void
  invalidatePostList?: boolean
}) {
  const qc = useQueryClient()

  const deriveChips = () =>
    REACTION_META.map((m) => {
      const found = reactions.find((r) => r.reactionType === m.reactionType)
      return {
        ...m,
        count: found?.count ?? 0,
        reactedByMe: found?.reactedByMe ?? false,
      }
    })

  const [chips, setChips] = useState(deriveChips)
  const [pendingType, setPendingType] = useState<ReactionType | null>(null)

  useEffect(() => {
    if (pendingType) return
    setChips(deriveChips())
  }, [reactions])

  const totalReactions = useMemo(() => chips.reduce((sum, c) => sum + c.count, 0), [chips])

  async function handleToggleReaction(reactionType: ReactionType) {
    if (pendingType) return

    const idx = chips.findIndex((c) => c.reactionType === reactionType)
    if (idx < 0) return

    const prev = chips
    const prevReacted = chips[idx].reactedByMe

    const next = chips.map((c, i) => {
      if (i !== idx) return c
      return {
        ...c,
        reactedByMe: !prevReacted,
        count: Math.max(0, c.count + (prevReacted ? -1 : 1)),
      }
    })

    setChips(next)
    setPendingType(reactionType)

    try {
      await onToggle?.(reactionType, prevReacted)

      if (invalidatePostList) {
        qc.invalidateQueries({ queryKey: postKeys.listBase() })
      }
    } catch (e) {
      setChips(prev)
    } finally {
      setPendingType(null)
    }
  }

  return (
    <section aria-label="리액션" className="flex items-center gap-3">
      <ul className="flex items-center gap-3">
        {chips.map((c) => (
          <li key={c.reactionType}>
            <ReactionChip
              emoji={c.emoji}
              count={c.count}
              pressed={c.reactedByMe}
              disabled={!!pendingType}
              onClick={() => handleToggleReaction(c.reactionType)}
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
