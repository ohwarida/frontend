'use server'

import { revalidatePath } from 'next/cache'
import { deleteReaction, createReaction } from '../apis/reaction.api'
import type { ReactionType } from '../types/Post.types'
import type { TargetType } from '../types/Reaction.types'

type ToggleReactionActionProps = {
  targetType: TargetType // 'POST' | 'COMMENT'
  targetId: number
  reactionType: ReactionType
  reactedByMe: boolean
  revalidatePathname?: string
}

export async function toggleReactionAction({
  targetType,
  targetId,
  reactionType,
  reactedByMe,
  revalidatePathname,
}: ToggleReactionActionProps) {
  if (reactedByMe) {
    await deleteReaction({ targetType, targetId, reactionType })
  } else {
    await createReaction({ targetType, targetId, reactionType })
  }

  if (revalidatePathname) revalidatePath(revalidatePathname)
}
