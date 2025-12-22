'use client'

import { useActionState, useMemo, useState } from 'react'
import Form from 'next/form'
import Input from '@/components/ui/Input'
import MarkdownEditor from '@/components/markdown/MarkdownEditor'
import MarkdownViewer from '@/components/markdown/MarkdownViewer'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Select from '@/components/ui/Select'
import { createPostAction } from '@/features/(authenticated)/post/create/actions/postCreateAction'
import type { PostFormValues } from '@/features/(authenticated)/post/create/types/PostCreateForm.types'
import {
  TOPIC_LABEL,
  TOPIC_TYPE,
  type TopicType,
} from '@/features/(authenticated)/post/create/types/Topic.types'
import { useAuthState } from '@/app/hooks/useAuthState'

export const initialState: FormStateTypes<PostFormValues> = {
  values: { topic: 'EMPLOYMENT_TIP', title: '', content: '' },
  fieldErrors: {},
  success: false,
}

export default function PostCreateForm() {
  const [state, formAction, isPending] = useActionState(createPostAction, initialState)
  const [draftId] = useState(() => crypto.randomUUID())

  const [previewContent, setPreviewContent] = useState<string>(state.values?.content ?? '')

  const { user } = useAuthState()
  const isAdmin = user?.role === 'ADMIN'

  const topicOptions = useMemo(
    () =>
      Object.values(TOPIC_TYPE)
        .filter((v) => v !== TOPIC_TYPE.ALL)
        .filter((v) => (isAdmin ? true : v !== TOPIC_TYPE.NOTICE)) // ✅ 관리자 아니면 NOTICE 제거
        .map((v) => ({ value: v, label: TOPIC_LABEL[v] })),
    [isAdmin],
  )

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1400px] pt-[24px]">
        <Form
          id="postFormId"
          action={formAction}
          aria-busy={isPending}
          className="flex w-full flex-col gap-[24px] lg:flex-row"
        >
          <input type="hidden" name="draftId" value={draftId} />

          <section className="box-border flex w-full flex-col items-start gap-[24px] rounded-[10px] border border-[#E5E7EB] bg-white p-[33px] lg:w-[808px]">
            <div className="flex w-full flex-col gap-[8px]">
              <p className="text-[16px] leading-[24px] font-normal text-black">카테고리</p>
              <Select<TopicType>
                name="topic"
                defaultValue={topicOptions[0]?.value}
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
                defaultValue={state.values?.title ?? ''}
                disabled={isPending}
                className="h-[36px] w-full rounded-[8px] border-none !bg-[#F4F4F5] px-[16px] text-[14px] text-[#0A0A0A] placeholder:text-[#717182]"
              />
              {state.fieldErrors.title && (
                <ErrorMessage errorMessage={state.fieldErrors.title?.[0]} />
              )}
            </div>
            {/* TODO: highlighType 설정폼 추가 */}
            <div className="flex h-full w-full flex-col gap-[8px]">
              <div
                className={[
                  'h-full w-full overflow-hidden rounded-[8px] bg-[#F4F4F5]',
                  isPending ? 'pointer-events-none opacity-70' : '',
                ].join(' ')}
              >
                <MarkdownEditor
                  name="content"
                  defaultValue={state.values?.content ?? ''}
                  onChange={setPreviewContent}
                />
              </div>

              {state.fieldErrors.content && (
                <ErrorMessage errorMessage={state.fieldErrors.content?.[0]} />
              )}
            </div>

            {state.message && <ErrorMessage errorMessage={state.message} />}
          </section>

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
