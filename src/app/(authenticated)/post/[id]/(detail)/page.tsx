import MarkdownViewer from '@/components/markdown/MarkdownViewer'
import { Avatar } from '@/components/ui/Avatar'
import { Reaction } from '@/features/(authenticated)/post/components/Reaction'
import { CommentSection } from '@/features/(authenticated)/post/components/CommentSection'
import { toRelativeTimeLabel } from '@/utils/toRelativeTimeLabel'
import { Pencil, Trash2 } from 'lucide-react'
import { TOPIC_LABEL } from '@/types/Topic.types'
import { getUser } from '@/features/(authenticated)/users/apis/user.api'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { getPostDetail, deletePost } from '@/features/(authenticated)/post/apis/post.api'

export default async function PostDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params

  const post = await getPostDetail(id).catch(() => mockPost)
  const user = await getUser()

  const isOwner = post && user?.userId === post.writerId

  async function deletePostAction() {
    'use server'
    await deletePost(id)
    // TODO: 게시글 삭제 이후 어디로 리다이렉트 할 지 논의 필요
    revalidatePath('/')
    redirect('/')
  }

  return (
    post && (
      <section
        className="mx-auto w-full max-w-[1377px] rounded-lg bg-white p-8"
        aria-labelledby="post-title"
      >
        <div className="flex flex-col gap-8">
          <header className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2" aria-label="게시글 메타 정보">
              <Avatar size="sm" />
              <span className="text-[16px] leading-[24px] font-medium text-[#171719]">
                {post?.writerName}
              </span>
              <span aria-hidden className="text-[16px] leading-[24px] text-[rgba(55,56,60,0.61)]">
                ·
              </span>
              <time
                className="text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]"
                dateTime={post?.wroteAt}
              >
                {toRelativeTimeLabel(post?.wroteAt)}
              </time>
              <span className="inline-flex h-[22px] items-center justify-center rounded-lg bg-[#ECEEF2] px-2 text-[12px] leading-[16px] font-medium text-black">
                {TOPIC_LABEL[post?.topic]}
              </span>
            </div>
            {/* <BookMarkButton /> */}
            {isOwner && (
              <div className="flex h-7 w-[72px] items-center gap-4">
                <Link
                  href={`/post/${id}/edit`}
                  aria-label="수정"
                  className="h-7 w-7 rounded-md px-1 pt-1 pb-0 focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none"
                >
                  <Pencil size={20} stroke="rgba(55,56,60,0.61)" aria-hidden />
                </Link>

                <form action={deletePostAction}>
                  <button
                    type="submit"
                    aria-label="삭제"
                    className="h-7 w-7 rounded-md px-1 pt-1 pb-0 focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none"
                  >
                    <Trash2 size={20} stroke="rgba(55,56,60,0.61)" aria-hidden />
                  </button>
                </form>
              </div>
            )}
          </header>
          <h1 id="post-title" className="text-[36px] leading-[54px] font-medium text-black">
            {post.title}
          </h1>
          <ul className="flex flex-wrap gap-3" aria-label="태그">
            {/* TODO: 추후 # 제거 요청 */}
            {post?.tags?.map((t) => (
              <li key={t} className="text-[16px] leading-[24px] text-[rgba(46,47,51,0.88)]">
                #{t}
              </li>
            ))}
          </ul>
          <MarkdownViewer content={post?.content} />
          {/* TODO: 추후 리액션 조회 API 생성에 따라 props 추가 필요 */}
          <Reaction />
          <CommentSection postId={id} userId={user.userId} />
        </div>
      </section>
    )
  )
}

export const mockPost = {
  writerId: 1,
  writerName: '김개발',
  topic: 'EMPLOYMENT_TIP',
  title: '주니어 개발자를 위한 포트폴리오 작성 가이드',
  tags: ['취업', '포트폴리오', '주니어'],
  wroteAt: '2025-12-18T00:00:00.000Z',
  createdAtLabel: toRelativeTimeLabel('2025-12-18T00:00:00.000Z'),
  content: `안녕하세요! 주니어 개발자 취업 준비를 하면서 알게 된 포트폴리오 작성 팁을 공유합니다.

# 1. h1
실무에서 사용되는 기술 스택을 활용한 프로젝트를 최소 2-3개 준비하는 것이 좋습니다. 단순 클론 코딩보다는 자신만의 아이디어를 추가하는 것이 중요합니다.

## 2. h2
- 프로젝트 개요 및 목적
- 주요 기능 및 스크린샷
- 기술 스택 및 선택 이유
- 트러블슈팅 경험
- 성능 개선 사례

### 3. h3
- 일관된 코딩 컨벤션
- 적절한 주석
- 컴포넌트 분리
- 에러 핸들링

실제로 이 방법으로 포트폴리오를 정리한 후 서류 합격률이 30%에서 70%로 상승했습니다.
`,
} as const
