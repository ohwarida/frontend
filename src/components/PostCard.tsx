import Link from 'next/link'
import type { PostCard, ReactionType } from '@/features/(authenticated)/post/types/Post.types'
import { Avatar } from './ui/Avatar'
import { toRelativeTimeLabel } from '@/utils/toRelativeTimeLabel'
import { MessageCircle } from 'lucide-react'
import { Reaction } from '@/features/(authenticated)/post/components/Reaction'
import { toggleReactionAction } from '@/features/(authenticated)/post/actions/toggleReactionAction'
import { TopicType } from '@/types/Topic.types'
import { HREF_BY_TOPIC } from '@/features/(authenticated)/post/constants/topic'

type PostCardProps = {
  post: PostCard
}

export default function PostCard({ post }: PostCardProps) {
  const revalidatePathname = HREF_BY_TOPIC[post.topic as TopicType] ?? '/'

  async function handleToggleReaction(reactionType: ReactionType, reactedByMe: boolean) {
    'use server'
    await toggleReactionAction({
      targetType: 'POST',
      targetId: post.postId,
      reactionType,
      reactedByMe,
      revalidatePathname,
    })
  }

  return (
    <Link
      href={`/post/${post.postId}`}
      className="box-border block h-[201px] w-full max-w-[1045px] overflow-hidden rounded-[8px] bg-white pb-px shadow-[0px_1px_2px_rgba(0,0,0,0.12)]"
    >
      <article className="box-border flex h-[200px] w-full flex-col items-start gap-3 px-6 pt-6 pb-0">
        <div className="flex h-8 w-full items-center gap-3">
          <div className="flex h-8 w-6 items-center justify-center">
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

        <div className="flex min-h-[58px] w-full flex-col items-start gap-2">
          <h2
            className="line-clamp-1 w-full text-[24px] leading-[30px] font-medium text-black"
            title={post.title}
          >
            {post.title}
          </h2>

          {!!post.tags?.length && (
            <div className="flex h-5 w-full items-center gap-2 overflow-hidden">
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
          )}
        </div>

        <div className="flex h-[38px] w-full items-center justify-between gap-3">
          <Reaction reactions={post.reactions} onToggle={handleToggleReaction} />
          <div className="flex items-center gap-4 text-[14px] leading-5 text-[rgba(55,56,60,0.61)]">
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
