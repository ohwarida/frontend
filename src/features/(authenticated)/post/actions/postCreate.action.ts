'use server'

import { revalidatePath } from 'next/cache'
import { type TopicType } from '@/types/Topic.types'
import { HighlightType, PostFormState } from '@/features/(authenticated)/post/types/Post.types'
import { validatePost } from '@/features/(authenticated)/post/utils/validatePost'
import { createPost } from '@/features/(authenticated)/post/apis/post.api'
import { HREF_BY_TOPIC } from '@/features/(authenticated)/post/constants/topic'

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const values = {
    topic: String(formData.get('topic')) as TopicType,
    title: String(formData.get('title')),
    content: String(formData.get('content')),
    draftId: String(formData.get('draftId')),
    highlightType: 'NONE' as HighlightType, // TODO: 설정 폼 추가 후 수정
  }

  const fieldErrors = validatePost(values)
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, values, fieldErrors, message: '입력값을 다시 확인해 주세요.' }
  }

  try {
    const location = await createPost({ ...values })
    const idStr = extractIdFromLocation(location)
    const postId = idStr ? Number(idStr) : null

    revalidatePath(HREF_BY_TOPIC[values.topic] ?? '/')
    if (postId) revalidatePath(`/post/${postId}`)

    return { success: true, values, fieldErrors: {}, postId }
  } catch {
    return {
      success: false,
      values,
      fieldErrors: {},
      message: '게시글 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }
}

function extractIdFromLocation(location?: string | null) {
  if (!location) return null
  const parts = location.split('/').filter(Boolean)
  return parts.at(-1) ?? null
}
