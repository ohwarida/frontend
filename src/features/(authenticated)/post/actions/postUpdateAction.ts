'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { type TopicType } from '@/types/Topic.types'
import { HighlightType, PostFormValues } from '../types/Post.types'
import { validatePost } from '../create/utils/validatePost'
import { updatePost } from '../apis/post.api'

export async function updatePostAction(
  _prevState: FormStateTypes<PostFormValues>,
  formData: FormData,
): Promise<FormStateTypes<PostFormValues>> {
  const postId = Number(formData.get('postId'))

  const values = {
    topic: String(formData.get('topic')) as TopicType,
    title: String(formData.get('title')),
    content: String(formData.get('content')),
    highlightType: 'NONE' as HighlightType, // TODO: 설정 폼 추가 후 수정
  }

  if (!postId || Number.isNaN(postId)) {
    return {
      success: false,
      values,
      fieldErrors: {},
      message: '게시글 ID가 올바르지 않습니다.',
    }
  }

  const fieldErrors = validatePost(values)
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      values,
      fieldErrors,
      message: '입력값을 다시 확인해 주세요.',
    }
  }

  try {
    await updatePost({ postId, ...values })
  } catch {
    return {
      success: false,
      values,
      fieldErrors: {},
      message: '게시글 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }

  revalidatePath(`/post/${postId}`)
  redirect(`/post/${postId}`)
}
