import PostCard from '@/components/PostCard'
import { getPosts } from '@/features/(authenticated)/post/apis/post.api'
import { TOPIC_TYPE } from '@/types/Topic.types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '공지사항 | Wanted Ground PotenUp',
  description: '서비스 운영 및 업데이트 관련 공지사항을 확인할 수 있는 게시판입니다.',
}

export default async function NoticePage() {
  // TODO: getPosts가 topic/cursor/size 등을 쿼리로 받을 수 있게 되면, 전체 조회 후 프론트 필터링을 제거하고 서버에서 topic 필터링된 결과만 받아오도록 변경.
  const posts = await getPosts()
  const filtered = posts.contents.filter((p) => p.topic === TOPIC_TYPE.NOTICE)

  return (
    <>
      {filtered.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </>
  )
}
