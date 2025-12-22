import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import { GetPostsResponse } from '@/features/(authenticated)/post/types/Post.types'
import { getPosts } from '@/features/(authenticated)/post/apis/post.api'

export const metadata: Metadata = {
  title: '게시판 | Wanted Ground PotenUp',
  description: '취업 팁, Q&A, 공지사항 등 다양한 게시판을 한 곳에서 확인할 수 있습니다.',
}

export default async function TotalPage() {
  // TODO: getPosts가 topic/cursor/size 등을 쿼리로 받을 수 있게 되면, 전체 조회 후 프론트 필터링을 제거하고 서버에서 topic 필터링된 결과만 받아오도록 변경.
  const posts = await getPosts().catch(() => mockPosts)

  return (
    <>
      {posts.contents.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </>
  )
}

export const mockPosts: GetPostsResponse = {
  contents: [
    {
      writerId: 101,
      postId: 1001,
      writerName: '김개발',
      title: '주니어 개발자를 위한 포트폴리오 작성 가이드',
      topic: 'KNOWLEDGE',
      wroteAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
      highlightType: 'NONE',
      commentsCount: 18,
      reactions: [
        { reactionType: 'HEART', count: 5 },
        { reactionType: 'LIKE', count: 3 },
        { reactionType: 'SMILE', count: 0 },
      ],
    },
    {
      writerId: 102,
      postId: 1002,
      writerName: '박프론트',
      title: '면접에서 “프로젝트 설명”을 깔끔하게 하는 템플릿 공유해요',
      topic: 'EMPLOYMENT_TIP',
      wroteAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35분 전
      highlightType: 'BY_REACTION',
      commentsCount: 6,
      reactions: [
        { reactionType: 'HEART', count: 12 },
        { reactionType: 'LIKE', count: 7 },
        { reactionType: 'SMILE', count: 2 },
      ],
    },
    {
      writerId: 103,
      postId: 1003,
      writerName: '최백엔드',
      title: 'Spring Boot에서 Cursor 기반 무한스크롤 API 설계 팁',
      topic: 'NOTICE',
      wroteAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전
      highlightType: 'BY_VIEW',
      commentsCount: 3,
      reactions: [
        { reactionType: 'LIKE', count: 4 },
        { reactionType: 'HEART', count: 1 },
        { reactionType: 'SMILE', count: 1 },
      ],
    },
  ],
}
