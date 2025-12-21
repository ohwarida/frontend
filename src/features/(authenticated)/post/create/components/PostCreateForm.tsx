'use client'

import React, { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CircleUserRound } from 'lucide-react'

import Input from '@/components/ui/Input'
import MarkdownEditor from '@/components/markdown/MarkdownEditor'
import { createContentAction } from '@/features/(authenticated)/post/create/postCreateActions'
import Form from 'next/form'
import MarkdownViewer from '@/components/markdown/MarkdownViewer'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { PostFormValues } from '@/features/(authenticated)/post/create/types/PostCreateForm.types'
import {
  TOPIC_LABEL,
  TOPIC_TYPE,
  TopicType,
} from '@/features/(authenticated)/post/create/types/Topic.types'
import Select from '@/components/ui/Select'

export const initialState: FormStateTypes<PostFormValues> = {
  values: {
    topic: 'NOTICE',
    title: '',
    content: '',
  },
  fieldErrors: {},
  success: false,
}

export default function PostCreateForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(createContentAction, initialState)

  const [previewContent, setPreviewContent] = useState<string>(state.values?.content ?? '')

  return (
    <div className="w-full">
      {/* DesktopPostCreation (Header) */}
      <header className="h-[65px] w-full border-b border-[#E5E7EB] bg-white">
        {/* padding: 0 395.5px -> ✅ max-w 1400 + mx-auto로 동일 효과 */}
        <div className="mx-auto flex h-[64px] w-full max-w-[1400px] items-center justify-between">
          {/* Left */}
          <div className="flex h-[36px] items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px]"
              aria-label="뒤로가기"
            >
              <ArrowLeft size={16} className="text-[#0A0A0A]" />
            </button>

            <h1 className="text-[24px] leading-[36px] font-normal text-[#101828]">글쓰기</h1>
          </div>

          {/* Right */}
          <div className="flex h-[36px] items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-[36px] rounded-[8px] border border-[rgba(0,0,0,0.1)] bg-white px-4 text-[14px] leading-[20px] font-medium text-[#0A0A0A]"
            >
              취소
            </button>

            {/* form 밖에서도 submit 되도록 form="postFormId" */}
            <button
              type="submit"
              form="postFormId"
              disabled={isPending}
              className={[
                'h-[36px] rounded-[8px] bg-[#155DFC] px-4 text-[14px] leading-[20px] font-medium text-white',
                isPending ? 'opacity-50' : 'opacity-100',
              ].join(' ')}
            >
              발행하기
            </button>

            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full">
              <CircleUserRound size={32} className="text-black" />
            </div>
          </div>
        </div>
      </header>

      {/* App padding-top 65 이후 content top 89 => 24px 간격 */}
      <div className="mx-auto w-full max-w-[1400px] pt-[24px]">
        <Form
          id="postFormId"
          action={formAction}
          className="flex w-full flex-col gap-[23px] lg:flex-row"
        >
          {/* Left Main Content (808 x 843) */}
          <section className="box-border flex w-full flex-col items-start gap-6 rounded-[10px] border border-[#E5E7EB] bg-white px-[33px] pt-[33px] pb-[1px] lg:h-[843px] lg:w-[808px]">
            {/* Category */}
            <div className="w-full space-y-2">
              <p className="text-[16px] leading-[24px] font-normal text-black">카테고리</p>

              <Select<TopicType>
                name="topic"
                defaultValue={(state.values?.topic as TopicType) ?? ''}
                options={Object.values(TOPIC_TYPE).map((v) => ({
                  value: v,
                  label: TOPIC_LABEL[v],
                }))}
              />
              {state.fieldErrors.topic && (
                <ErrorMessage errorMessage={state.fieldErrors?.topic?.[0]} />
              )}
            </div>

            {/* Title */}
            <div className="w-full space-y-2">
              <Input
                name="title"
                placeholder="제목을 입력하세요"
                defaultValue={state.values?.title ?? ''}
              />
              {state.fieldErrors.title && (
                <ErrorMessage errorMessage={state.fieldErrors.title?.[0]} />
              )}
            </div>

            {/* Markdown Editor (742 x 500 느낌) */}
            <div className="w-full space-y-2">
              <div className="w-full rounded-[8px] bg-[#F4F4F5]">
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

          {/* Right Main Content (569 x 843) */}
          <section className="box-border flex w-full flex-col items-start gap-6 rounded-[10px] border border-[#E5E7EB] bg-white px-[33px] pt-[33px] pb-[1px] lg:h-[843px] lg:w-[569px]">
            <p className="text-[16px] leading-[24px] font-normal text-black">미리보기</p>

            <div className="w-full overflow-y-auto rounded-[8px] bg-white lg:h-[734px]">
              {previewContent ? (
                <MarkdownViewer content={previewContent} />
              ) : (
                <p className="text-sm text-gray-400">
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
