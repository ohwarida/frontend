import { getMentionUsers } from '@/services/mentionsUsers.service'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useMentionUsers(size = 20, enabled = false) {
  return useInfiniteQuery({
    queryKey: ['mention-users', size],
    enabled,
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams()
      params.set('size', String(size))
      if (pageParam != null) params.set('cursorId', String(pageParam))

      return await getMentionUsers(params.toString())
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length < size) return undefined
      return lastPage.at(-1)!.userId
    },
  })
}

export type MentionUser = {
  userId: number
  name: string
  profileImageUrl: string | null
  trackName: string
}
