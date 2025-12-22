import { getPostDetail } from '@/features/(authenticated)/post/[id]/apis/post.api'
import { updatePostAction } from '@/features/(authenticated)/post/create/actions/postUpdateAction'
import PostForm from '@/features/(authenticated)/post/create/components/PostForm'

export default async function PostEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postId = Number(id)

  const post = await getPostDetail(postId)

  return (
    <main className="min-h-screen w-full bg-[#F9FAFB]">
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
    </main>
  )
}
