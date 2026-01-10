import { createPostAction } from '@/features/(authenticated)/post/actions/postCreate.action'
import PostForm from '@/features/(authenticated)/post/create/components/PostForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '게시글 작성 | Wanted Ground PotenUp',
  description: '새 게시글을 작성하는 페이지입니다.',
}

export default function PostCreatePage() {
  return (
    <PostForm
      mode="create"
      action={createPostAction}
      initialValues={{ topic: 'KNOWLEDGE', title: '', content: '' }}
    />
  )
}
