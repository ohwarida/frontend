'use client'

import { useActionState, useMemo, useState } from 'react'
import Form from 'next/form'
import Input from '@/components/ui/Input'
import MarkdownEditor from '@/components/markdown/MarkdownEditor'
import MarkdownViewer from '@/components/markdown/MarkdownViewer'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Select from '@/components/ui/Select'
import { TOPIC_LABEL, TOPIC_TYPE, type TopicType } from '@/types/Topic.types'
import { useAuthState } from '@/app/hooks/useAuthState'
import { PostFormValues } from '../../types/Post.types'

export type PostFormMode = 'create' | 'edit'

type ActionFn = (
  prevState: FormStateTypes<PostFormValues>,
  formData: FormData,
) => Promise<FormStateTypes<PostFormValues>>

type PostFormProps = {
  mode: PostFormMode
  action: ActionFn
  initialValues: PostFormValues
  postId?: number
  formKey?: string | number
}

export default function PostForm({ mode, action, initialValues, postId, formKey }: PostFormProps) {
  const { user } = useAuthState()
  const isAdmin = user?.role === 'ADMIN'

  const topicOptions = useMemo(
    () =>
      Object.values(TOPIC_TYPE)
        .filter((v) => v !== TOPIC_TYPE.ALL)
        .filter((v) => (isAdmin ? true : v !== TOPIC_TYPE.NOTICE))
        .map((v) => ({ value: v, label: TOPIC_LABEL[v] })),
    [isAdmin],
  )

  const initialState = useMemo<FormStateTypes<PostFormValues>>(
    () => ({
      values: initialValues,
      fieldErrors: {},
      success: false,
    }),
    [initialValues],
  )

  const [state, formAction, isPending] = useActionState(action, initialState)
  const [draftId] = useState(() => crypto.randomUUID())

  const [previewContent, setPreviewContent] = useState<string>(initialValues.content ?? '')

  return (
    <div className="w-full" key={formKey}>
      <div className="mx-auto w-full max-w-[1400px]">
        <Form
          id="postFormId"
          action={formAction}
          aria-busy={isPending}
          className="flex w-full flex-col gap-[24px] lg:flex-row"
        >
          {mode === 'create' ? (
            <input type="hidden" name="draftId" value={draftId} />
          ) : (
            <input type="hidden" name="postId" value={postId} />
          )}
          <section className="box-border flex w-full flex-col items-start gap-[24px] rounded-[10px] border border-[#E5E7EB] bg-white p-[33px] lg:w-[808px]">
            <div className="flex w-full flex-col gap-[8px]">
              <p className="text-[16px] leading-[24px] font-normal text-black">카테고리</p>
              <Select<TopicType>
                name="topic"
                defaultValue={(state.values?.topic ?? initialValues.topic) as TopicType}
                options={topicOptions}
                className="h-[36px] w-full rounded-[8px] border-none !bg-[#F4F4F5] px-[12px] text-[14px] text-[#0A0A0A]"
              />
              {state.fieldErrors.topic && (
                <ErrorMessage errorMessage={state.fieldErrors.topic?.[0]} />
              )}
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <Input
                name="title"
                placeholder="제목을 입력하세요"
                defaultValue={state.values?.title ?? initialValues.title ?? ''}
                disabled={isPending}
                className="h-[36px] w-full rounded-[8px] border-none !bg-[#F4F4F5] px-[16px] text-[14px] text-[#0A0A0A] placeholder:text-[#717182]"
              />
              {state.fieldErrors.title && (
                <ErrorMessage errorMessage={state.fieldErrors.title?.[0]} />
              )}
            </div>

            {/* TODO: highlightType 설정폼 추가 */}
            <div className="flex h-full w-full flex-col gap-[8px]">
              <div
                className={[
                  'h-full w-full overflow-hidden rounded-[8px] bg-[#F4F4F5]',
                  isPending ? 'pointer-events-none opacity-70' : '',
                ].join(' ')}
              >
                <MarkdownEditor
                  name="content"
                  defaultValue={state.values?.content ?? initialValues.content ?? ''}
                  onChange={setPreviewContent}
                />
              </div>

              {state.fieldErrors.content && (
                <ErrorMessage errorMessage={state.fieldErrors.content?.[0]} />
              )}
            </div>

            {state.message && <ErrorMessage errorMessage={state.message} />}
          </section>

          {/* 오른쪽: 미리보기 */}
          <section className="box-border flex w-full flex-col items-start gap-[24px] rounded-[10px] border border-[#E5E7EB] bg-white px-[33px] pt-[33px] pb-[1px] lg:w-[569px]">
            <p className="text-[16px] leading-[24px] font-normal text-black">미리보기</p>

            <div className="w-full overflow-y-auto rounded-[8px] bg-white lg:min-h-[734px]">
              {previewContent ? (
                <MarkdownViewer content={previewContent} />
              ) : (
                <p className="text-[14px] leading-[20px] text-[#717182]">
                  왼쪽 에디터에 내용을 입력하면 여기에서 미리 보기가 표시됩니다.
                </p>
              )}
            </div>
          </section>
        </Form>
      </div>
    </div>
  )
}
