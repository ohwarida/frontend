'use client'

import React, { useActionState, useState } from 'react'
import Input from '@/components/ui/Input'
import MarkdownEditor from '@/components/markdown/MarkdownEditor'
import { createContentAction } from '@/features/(authenticated)/content/create/contentCreateActions'
import Form from 'next/form'
import MarkdownViewer from '@/components/markdown/MarkdownViewer'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { ContentFormValues } from '@/features/(authenticated)/content/create/types/ContentCreateForm.types'
import {
  TOPIC_LABEL,
  TOPIC_TYPE,
  TopicType,
} from '@/features/(authenticated)/content/create/types/Topic.types'
import Select from '@/components/ui/Select'

export const initialState: FormStateTypes<ContentFormValues> = {
  values: {
    topic: 'NOTICE',
    title: '',
    content: '',
  },
  fieldErrors: {},
  success: false,
}

export default function ContentCreateForm() {
  const [state, formAction, isPending] = useActionState(createContentAction, initialState)

  const [previewContent, setPreviewContent] = useState<string>(state.values?.content ?? '')

  return (
    <Form
      id="postFormId"
      action={formAction}
      className="mx-auto flex h-[50rem] w-full max-w-7xl gap-4 p-5"
    >
      {/* 왼쪽: 작성 폼 */}
      <section className="h-full w-2/3 space-y-6 rounded-md border border-gray-300 bg-white p-[33px]">
        <div className="space-y-1">
          <Select<TopicType>
            name="topic"
            defaultValue={(state.values?.topic as TopicType) ?? ''}
            options={Object.values(TOPIC_TYPE).map((v) => ({
              value: v,
              label: TOPIC_LABEL[v],
            }))}
          />
          {state.fieldErrors.topic && <ErrorMessage errorMessage={state.fieldErrors?.topic?.[0]} />}
        </div>

        {/* 제목 */}
        <div className="space-y-1">
          <Input
            name="title"
            placeholder="제목을 입력하세요."
            defaultValue={state.values?.title ?? ''}
          />
          {state.fieldErrors.title && <ErrorMessage errorMessage={state.fieldErrors.title?.[0]} />}
        </div>

        {/* 내용 (Markdown) */}
        <div className="h-[calc(100%-147px)] space-y-1">
          <MarkdownEditor
            name="content"
            defaultValue={state.values?.content ?? ''}
            onChange={setPreviewContent}
          />
          {state.fieldErrors.content && (
            <ErrorMessage errorMessage={state.fieldErrors.content?.[0]} />
          )}
        </div>

        {state.message && <ErrorMessage errorMessage={state.message} />}
      </section>

      {/* 오른쪽: 미리보기 */}
      <section className="w-1/3 space-y-3 rounded-md border border-gray-300 bg-white p-[33px]">
        <h3 className="text-xs">미리보기</h3>
        <div className="overflow-y-auto bg-white">
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
  )
}
