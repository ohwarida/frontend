import { TOPIC_TYPE } from '../../../../../types/Topic.types'
import { PostFormValues } from '../../types/Post.types'

export function validatePost(values: PostFormValues) {
  const fieldErrors: FormStateTypes<PostFormValues>['fieldErrors'] = {}

  if (!values.topic || values.topic === TOPIC_TYPE.ALL) {
    fieldErrors.topic = ['카테고리를 선택해 주세요.']
  }
  if (!values.title) fieldErrors.title = ['제목을 입력해 주세요.']
  if (!values.content) fieldErrors.content = ['내용을 입력해 주세요.']

  return fieldErrors
}
