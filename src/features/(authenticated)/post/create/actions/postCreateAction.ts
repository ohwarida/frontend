'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import type { PostFormValues } from '@/features/(authenticated)/post/create/types/PostCreateForm.types'
import {
  TOPIC_TYPE,
  type TopicType,
} from '@/features/(authenticated)/post/create/types/Topic.types'
import { createPost } from '../../[id]/apis/post.api'
import { TABS } from '@/app/(authenticated)/(board)/layout'
import { HighlightType } from '../../[id]/types/Post.types'

const HREF_BY_TOPIC = Object.fromEntries(
  TABS.filter((t) => t.id !== TOPIC_TYPE.ALL).map((t) => [t.id, t.href]),
) as Partial<Record<TopicType, string>>

export async function createPostAction(
  _prevState: FormStateTypes<PostFormValues>,
  formData: FormData,
): Promise<FormStateTypes<PostFormValues>> {
  const values = {
    topic: String(formData.get('topic')) as TopicType,
    title: String(formData.get('title')),
    content: String(formData.get('content')),
    draftId: String(formData.get('draftId')),
    highlightType: 'NONE' as HighlightType, // TODO: 설정 폼 추가 후 수정
  }

  const fieldErrors = validate(values)
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      values,
      fieldErrors,
      message: '입력값을 다시 확인해 주세요.',
    }
  }

  let postId = null
  try {
    const location = await createPost({ ...values })
    postId = extractIdFromLocation(location)
  } catch {
    return {
      success: false,
      values,
      fieldErrors: {},
      message: '게시글 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }

  const to = HREF_BY_TOPIC[values.topic] ?? '/'
  revalidatePath(to)

  redirect(postId ? `/post/${postId}` : to)
}

function validate(values: PostFormValues) {
  const fieldErrors: FormStateTypes<PostFormValues>['fieldErrors'] = {}

  if (!values.topic || values.topic === TOPIC_TYPE.ALL) {
    fieldErrors.topic = ['카테고리를 선택해 주세요.']
  }
  if (!values.title) fieldErrors.title = ['제목을 입력해 주세요.']
  if (!values.content) fieldErrors.content = ['내용을 입력해 주세요.']

  return fieldErrors
}

function extractIdFromLocation(location?: string | null) {
  if (!location) return null
  const parts = location.split('/').filter(Boolean)
  return parts.at(-1) ?? null
}
