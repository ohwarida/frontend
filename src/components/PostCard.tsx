'use client'

import Link from 'next/link'
import clsx from 'clsx'
import type { PostCard, ReactionType } from '@/features/(authenticated)/post/types/Post.types'
import { toRelativeTimeLabel } from '@/utils/toRelativeTimeLabel'
import { MessageCircle } from 'lucide-react'
import { Reaction } from '@/features/(authenticated)/post/components/Reaction'
import { toggleReactionAction } from '@/features/(authenticated)/post/actions/toggleReaction.action'
import { HREF_BY_TOPIC } from '@/features/(authenticated)/post/constants/topic'
import { TopicType } from '@/types/Topic.types'
import { Avatar } from '@/components/ui/Avatar'

type PostCardProps = { post: PostCard }

export default function PostCard({ post }: PostCardProps) {
  const revalidatePathname = HREF_BY_TOPIC[post.topic as TopicType] ?? '/'

  async function handleToggleReaction(reactionType: ReactionType, reactedByMe: boolean) {
    await toggleReactionAction({
      targetType: 'POST',
      targetId: post.postId,
      reactionType,
      reactedByMe,
      revalidatePathname,
    })
  }

  const totalReactions = post.reactions.reduce((acc, r) => acc + r.count, 0)

  return (
    <Link
      href={`/post/${post.postId}`}
      className={clsx(
        'block w-full border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-4',
        'md:box-border md:h-[201px] md:max-w-[1045px] md:overflow-hidden md:rounded-[8px] md:border-b-0 md:bg-white md:pb-px md:shadow-[0px_1px_2px_rgba(0,0,0,0.12)]',
        'md:p-0',
      )}
    >
      <article
        className={clsx(
          'flex w-full flex-col gap-4',
          'md:box-border md:flex md:h-[200px] md:w-full md:flex-col md:items-start md:gap-3 md:p-6',
        )}
      >
        <div className={clsx('flex w-full items-center gap-3', 'md:h-8')}>
          <div className={clsx('flex h-8 w-8 items-center justify-center', 'md:w-6')}>
            <Avatar size="xs" />
          </div>

          <div className="flex flex-1 items-center gap-2">
            <span className="text-[16px] leading-6 font-medium text-[#171719]">
              {post.writerName}
            </span>
            <span className="text-[16px] leading-6 text-[rgba(55,56,60,0.61)]">·</span>
            <span className="text-[14px] leading-5 text-[rgba(55,56,60,0.61)]">
              {toRelativeTimeLabel(post.wroteAt)}
            </span>
          </div>
        </div>

        <div className={clsx('flex w-full flex-col gap-2', 'md:min-h-[58px] md:items-start')}>
          <h2
            className={clsx(
              'w-full text-[20px] leading-[30px] font-medium text-black md:text-[24px]',
              'line-clamp-2 md:line-clamp-1',
            )}
            title={post.title}
          >
            {post.title}
          </h2>

          {!!post.tags?.length && (
            <>
              {/* mobile tags (원래 mobile) */}
              <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 md:hidden">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[14px] leading-5 whitespace-nowrap text-[rgba(46,47,51,0.88)]"
                    title={`#${t}`}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="hidden h-5 w-full items-center gap-2 overflow-hidden md:flex">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[14px] leading-5 whitespace-nowrap text-[rgba(46,47,51,0.88)]"
                    title={`#${t}`}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div
          className={clsx(
            'flex w-full flex-col gap-3',
            'md:h-[38px] md:flex-row md:items-center md:justify-between md:gap-3',
          )}
        >
          <div className="md:hidden">
            <Reaction
              reactions={post.reactions}
              onToggle={handleToggleReaction}
              showTotal={false}
            />
          </div>
          <div className="hidden md:block">
            <Reaction reactions={post.reactions} onToggle={handleToggleReaction} />
          </div>

          <div className="flex w-full items-center justify-between text-[14px] leading-5 text-[rgba(55,56,60,0.61)] md:hidden">
            <span className="tabular-nums">{totalReactions} reactions</span>

            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="translate-y-[0.5px]" size={16} />
              <span className="tabular-nums">{post.commentsCount}</span>
            </span>
          </div>

          <div className="hidden items-center gap-4 text-[14px] leading-5 text-[rgba(55,56,60,0.61)] md:flex">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="translate-y-[0.5px]" size={16} />
              <span className="tabular-nums">{post.commentsCount}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
