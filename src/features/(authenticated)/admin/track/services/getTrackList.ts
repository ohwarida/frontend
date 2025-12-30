import { safeJson, server } from '@/lib/api/server'

// TODO backend에서 백엔드 규격보고 맞춤
export async function getTrackList(all: boolean): Promise<{ content: Track[] }> {
  const res = await server(`/api/v1/admin/tracks${all ? '/all' : ''}`, {
    next: { tags: ['tracks'] },
  })
  if (!res.ok) throw new Error('트랙 조회 실패')
  return (await safeJson<{ content: Track[] }>(res)) ?? ([] as unknown as { content: Track[] })
}
