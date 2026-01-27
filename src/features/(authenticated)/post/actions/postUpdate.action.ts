'use server'

import { revalidatePath } from 'next/cache'
import { type TopicType } from '@/types/Topic.types'
import { HighlightType, PostFormState } from '@/features/(authenticated)/post/types/Post.types'
import { updatePost } from '@/features/(authenticated)/post/apis/post.api'
import { HREF_BY_TOPIC } from '@/features/(authenticated)/post/constants/topic'
import { validatePost } from '@/features/(authenticated)/post/utils/validatePost'

export async function updatePostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const postId = Number(formData.get('postId'))

  const values = {
    topic: String(formData.get('topic')) as TopicType,
    title: String(formData.get('title')),
    content: String(formData.get('content')),
    draftId: String(formData.get('draftId')),
    highlightType: 'NONE' as HighlightType,
  }

  if (!postId || Number.isNaN(postId)) {
    return { success: false, values, fieldErrors: {}, message: '게시글 ID가 올바르지 않습니다.' }
  }

  const fieldErrors = validatePost(values)
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, values, fieldErrors, message: '입력값을 다시 확인해 주세요.' }
  }

  try {
    await updatePost({ postId, ...values })

    revalidatePath(HREF_BY_TOPIC[values.topic] ?? '/')
    if (postId) revalidatePath(`/post/${postId}`)

    return { success: true, values, fieldErrors: {}, postId }
  } catch {
    return {
      success: false,
      values,
      fieldErrors: {},
      message: '게시글 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }
}
