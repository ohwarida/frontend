import MarkdownViewer from '@/components/markdown/MarkdownViewer'
import { Reaction } from '@/features/(authenticated)/post/components/Reaction'
import { CommentSection } from '@/features/(authenticated)/post/components/CommentSection'
import { toRelativeTimeLabel } from '@/utils/toRelativeTimeLabel'
import { ArrowLeft, ArrowRight, List, Pencil, Trash2 } from 'lucide-react'
import { TOPIC_LABEL } from '@/types/Topic.types'
import { getUser } from '@/features/(authenticated)/users/apis/user.api'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { getPostDetail, deletePost } from '@/features/(authenticated)/post/apis/post.api'
import type { ReactionType } from '@/features/(authenticated)/post/types/Post.types'
import { getPostDetailReaction } from '@/features/(authenticated)/post/apis/reaction.api'
import { toggleReactionAction } from '@/features/(authenticated)/post/actions/toggleReaction.action'
import { PostDetailHeader } from '@/features/(authenticated)/post/components/PostDetailHeader'
import { RelativeTime } from '@/components/RelativeTime'
import { Avatar } from '@/components/ui/Avatar'

export default async function PostDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params

  const post = await getPostDetail(id)
  const user = await getUser()

  const hasPrev = Boolean(post?.previousPost?.previousPostId)
  const hasNext = Boolean(post?.nextPost?.nextPostId)

  const wroteAt = post?.wroteAt ?? ''
  const wroteAtLabel = wroteAt ? toRelativeTimeLabel(wroteAt) : ''

  const isOwner = post && user?.userId === post.writerId

  const reactionSummary = await getPostDetailReaction(id)
  const reactions = (
    Object.entries(reactionSummary?.summaries ?? {}) as Array<
      [ReactionType, { count: number; reactedByMe: boolean }]
    >
  ).map(([reactionType, v]) => ({
    reactionType,
    count: v?.count ?? 0,
    reactedByMe: v?.reactedByMe ?? false,
  }))

  async function deletePostAction() {
    'use server'
    await deletePost(id)
    revalidatePath('/')
    redirect('/')
  }

  async function handleToggleReaction(reactionType: ReactionType, reactedByMe: boolean) {
    'use server'
    await toggleReactionAction({
      targetType: 'POST',
      targetId: id,
      reactionType,
      reactedByMe,
      revalidatePathname: `/post/${id}`,
    })
  }

  return (
    post && (
      <>
        <div className="lg:hidden">
          <PostDetailHeader
            title="게시글"
            fallbackHref="/"
            postId={id}
            isOwner={Boolean(isOwner)}
            deletePostAction={deletePostAction}
          />
        </div>
        <section
          aria-labelledby="post-title"
          className={[
            'bg-white px-4 pb-25 lg:pb-6',
            'lg:mx-auto lg:w-full lg:max-w-[1377px] lg:rounded-lg lg:p-8 lg:pt-8',
          ].join(' ')}
        >
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-3 border-b border-[#F3F4F6] py-4 lg:gap-8 lg:border-0 lg:py-0">
              <header className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2" aria-label="게시글 메타 정보">
                  <Avatar size="sm" src={post.profileImageUrl} />
                  <span className="text-[16px] leading-[24px] font-medium text-[#171719]">
                    {post?.writerName}
                  </span>
                  <span className="text-[16px] leading-6 text-[rgba(55,56,60,0.61)]">·</span>
                  <span className="text-[14px] leading-5 text-[rgba(55,56,60,0.61)]">
                    {post?.trackName}
                  </span>
                  <span
                    aria-hidden
                    className="text-[16px] leading-[24px] text-[rgba(55,56,60,0.61)]"
                  >
                    ·
                  </span>
                  <RelativeTime
                    dateTime={wroteAt}
                    initialLabel={wroteAtLabel}
                    className="text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]"
                  />
                  <span className="inline-flex h-[22px] items-center justify-center rounded-lg bg-[#ECEEF2] px-2 text-[12px] leading-[16px] font-medium text-black">
                    {TOPIC_LABEL[post?.topic]}
                  </span>
                </div>
                {isOwner && (
                  <div className="hidden h-7 w-[72px] items-center gap-4 lg:flex">
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
                        // TODO: 삭제 토스트 추가
                      >
                        <Trash2 size={20} stroke="rgba(55,56,60,0.61)" aria-hidden />
                      </button>
                    </form>
                  </div>
                )}
              </header>
              <h1
                id="post-title"
                className="text-[16px] leading-[24px] font-medium text-[#101828] lg:text-[36px] lg:leading-[54px] lg:text-black"
              >
                {post.title}
              </h1>
              <ul className="flex flex-wrap gap-2 lg:gap-3" aria-label="태그">
                {post?.tags?.map((t) => (
                  <li
                    key={t}
                    className="text-[12px] leading-[16px] text-[#155DFC] lg:text-[16px] lg:leading-[24px] lg:text-[rgba(46,47,51,0.88)]"
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            </div>
            <MarkdownViewer content={post?.content} />
            <Reaction reactions={reactions} onToggle={handleToggleReaction} />

            <CommentSection postId={id} userId={user.userId} />
          </div>
          <div className="mt-9 space-y-9">
            <div className="flex items-center gap-4">
              {hasPrev ? (
                <Link
                  href={`/post/${post.previousPost.previousPostId}`}
                  className="flex w-full flex-col gap-1 rounded-2xl border border-gray-300 px-2 py-4"
                >
                  <div className="flex items-center gap-2 text-xs leading-none text-gray-400">
                    <ArrowLeft size={12} />
                    <span className="mt-0.5 leading-none">이전 글</span>
                  </div>
                  <span className="mt-0.5 leading-none">
                    {post?.previousPost.previousPostTitle}
                  </span>
                </Link>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex w-full cursor-not-allowed flex-col gap-1 rounded-2xl border border-gray-200 bg-gray-50 px-2 py-4 opacity-60"
                >
                  <div className="flex items-center gap-2 text-xs leading-none text-gray-400">
                    <ArrowLeft size={12} />
                    <span className="mt-0.5 leading-none">이전 글</span>
                  </div>
                  <span className="mt-0.5 leading-none">이전 글이 없습니다</span>
                </div>
              )}
              {hasNext ? (
                <Link
                  href={`/post/${post.nextPost.nextPostId}`}
                  className="flex w-full flex-col items-end gap-1 rounded-2xl border border-gray-300 px-2 py-4"
                >
                  <div className="flex items-center gap-2 text-xs leading-none text-gray-400">
                    <span className="mt-0.5 leading-none">다음 글</span>
                    <ArrowRight size={12} />
                  </div>
                  <span className="mt-0.5 leading-none">{post?.nextPost.nextPostTitle}</span>
                </Link>
              ) : (
                <div
                  aria-disabled="true"
                  className="flex w-full cursor-not-allowed flex-col gap-1 rounded-2xl border border-gray-200 bg-gray-50 px-2 py-4 opacity-60"
                >
                  <div className="flex items-center gap-2 text-xs leading-none text-gray-400">
                    <ArrowLeft size={12} />
                    <span className="mt-0.5 leading-none">다음 글</span>
                  </div>
                  <span className="mt-0.5 leading-none">다음 글이 없습니다</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <Link
                href={`${TOPIC_BASE_PATH[post.topic]}`}
                className="flex items-center gap-4 rounded-lg border border-gray-300 px-3 py-1.5"
              >
                <List size={16} className="text-gray-700" />
                <span>목록으로 돌아가기</span>
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  )
}

const TOPIC_BASE_PATH = {
  ALL: '/',
  EMPLOYMENT_TIP: '/job-tips',
  NOTICE: '/notice',
  SMALL_TALK: '/small-talk',
  KNOWLEDGE: '/knowledge',
  STUDY: '/study',
} as const
