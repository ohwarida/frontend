'use server'

import { redirect } from 'next/navigation'
import { server } from '@/lib/api/server'
import { PostFormValues } from '@/features/(authenticated)/post/create/types/PostCreateForm.types'
import { TopicType } from '@/features/(authenticated)/post/create/types/Topic.types'

export async function createContentAction(
  prevState: FormStateTypes<PostFormValues>,
  formData: FormData,
): Promise<FormStateTypes<PostFormValues>> {
  const raw: PostFormValues = {
    topic: String(formData.get('topic') ?? '') as TopicType,
    title: String(formData.get('title') ?? ''),
    content: String(formData.get('content') ?? ''),
  }

  const fieldErrors: FormStateTypes<PostFormValues>['fieldErrors'] = {}

  if (!raw.topic.trim()) fieldErrors.topic = ['카테고리를 선택해 주세요.']
  if (!raw.title.trim()) fieldErrors.title = ['제목을 입력해 주세요.']
  if (!raw.content.trim()) fieldErrors.content = ['내용을 입력해 주세요.']

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: '입력값을 다시 확인해 주세요.',
      fieldErrors,
      values: raw,
      success: false,
    }
  }

  const payload = {
    topic: raw.topic,
    title: raw.title,
    content: raw.content,
    highlightType: 'BY_ADMIN',
  }

  try {
    await server('/api/v1/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
  } catch (e) {
    return {
      success: false,
      values: raw,
      fieldErrors: {},
      message: '알 수 없는 오류가 발생했습니다.',
    }
  }

  // 성공 시 이동
  switch (raw.topic) {
    case 'EMPLOYMENT_TIP':
      return redirect('/job-tips')
    case 'KNOWLEDGE':
      return redirect('/retrospect') // 여기 지식인지 아닌지..
    case 'NOTICE':
      return redirect('/notice')
    // case 'retrospect':
    //   return redirect('/retrospect')
    // case 'trend':
    //   return redirect('/trend')
    default:
      return redirect('/job-tips')
  }
}
