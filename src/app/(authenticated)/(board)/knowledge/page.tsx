import PostCard from '@/components/PostCard'
import { getPosts } from '@/features/(authenticated)/post/apis/post.api'
import { TOPIC_TYPE } from '@/types/Topic.types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '지식 | Wanted Ground PotenUp',
  description: '모두의 지식을 공유하는 게시판입니다.',
}

export default async function KnowledgePage() {
  // TODO: getPosts가 topic/cursor/size 등을 쿼리로 받을 수 있게 되면, 전체 조회 후 프론트 필터링을 제거하고 서버에서 topic 필터링된 결과만 받아오도록 변경.
  const posts = await getPosts()
  console.log(posts)
  const filtered = posts.contents.filter((p) => p.topic === TOPIC_TYPE.KNOWLEDGE)

  return (
    <>
      {filtered.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </>
  )
}
