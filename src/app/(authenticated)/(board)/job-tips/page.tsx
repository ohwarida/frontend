import type { Metadata } from 'next'
import { TOPIC_TYPE } from '@/types/Topic.types'
import PostCard from '@/components/PostCard'
import { getPosts } from '@/features/(authenticated)/post/apis/post.api'

export const metadata: Metadata = {
  title: '취업 팁 | Wanted Ground PotenUp',
  description: '취업에 도움이 되는 팁과 노하우를 공유하고 확인할 수 있는 게시판입니다.',
}

export default async function JobTipsPage() {
  // TODO: getPosts가 topic/cursor/size 등을 쿼리로 받을 수 있게 되면, 전체 조회 후 프론트 필터링을 제거하고 서버에서 topic 필터링된 결과만 받아오도록 변경.
  const posts = await getPosts()
  const filtered = posts.contents.filter((p) => p.topic === TOPIC_TYPE.EMPLOYMENT_TIP)

  return (
    <>
      {filtered.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </>
  )
}
