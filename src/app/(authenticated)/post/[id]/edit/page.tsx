import { updatePostAction } from '@/features/(authenticated)/post/actions/postUpdate.action'
import { getPostDetail } from '@/features/(authenticated)/post/apis/post.api'
import { PostForm } from '@/features/(authenticated)/post/components/PostForm'

export default async function PostEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postId = Number(id)

  const post = await getPostDetail(postId)

  return (
    <PostForm
      mode="edit"
      action={updatePostAction}
      postId={postId}
      initialValues={{
        topic: post.topic,
        title: post.title,
        content: post.content,
      }}
      formKey={postId}
    />
  )
}
