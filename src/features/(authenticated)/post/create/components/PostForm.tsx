'use client'

import { useActionState, useEffect, useMemo, useState } from 'react'
import Form from 'next/form'
import Input from '@/components/ui/Input'
import MarkdownEditor from '@/components/markdown/MarkdownEditor'
import MarkdownViewer from '@/components/markdown/MarkdownViewer'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Select from '@/components/ui/Select'
import { TOPIC_LABEL, TOPIC_TYPE, type TopicType } from '@/types/Topic.types'
import { useAuthState } from '@/app/hooks/useAuthState'
import { PostFormState, PostFormValues } from '../../types/Post.types'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { postKeys } from '../../queries/postQueryOption'
import PostWritingGuide from '../../components/PostWritingGuide'

export type PostFormMode = 'create' | 'edit'

type ActionFn = (prevState: PostFormState, formData: FormData) => Promise<PostFormState>

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

  const initialState = useMemo<PostFormState>(
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

  const router = useRouter()
  const qc = useQueryClient()

  useEffect(() => {
    // TODO: 생성/수정이 제대로 안되었을 때, 대응 추가
    if (!state.success) return

    qc.removeQueries({ queryKey: postKeys.listBase() })
    if (state.postId) {
      qc.removeQueries({ queryKey: postKeys.detail(state.postId) })
      router.push(`/post/${state.postId}`)
    } else router.push('/') // postId 못 받는 비정상 케이스 fallback
  }, [state.success, state.postId, qc, router])

  return (
    <div className="w-full" key={formKey}>
      <Form
        id="postFormId"
        action={formAction}
        aria-busy={isPending}
        className="flex w-full flex-col gap-4 lg:flex-row lg:gap-[24px]"
      >
        <input type="hidden" name="draftId" value={draftId} />
        {mode === 'edit' && <input type="hidden" name="postId" value={postId} />}

        {/* 좌측: 작성 폼 */}
        <section className="box-border flex w-full flex-col items-start gap-4 bg-white p-0 lg:w-[808px] lg:gap-[24px] lg:rounded-[10px] lg:border lg:border-[#E5E7EB] lg:bg-white lg:p-[33px]">
          <div className="flex w-full flex-col gap-[8px]">
            <label
              htmlFor="topic"
              className="text-[16px] leading-[24px] font-normal text-[#364153]"
            >
              카테고리
            </label>
            <Select
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
            <label
              htmlFor="title"
              className="text-[16px] leading-[24px] font-normal text-[#364153]"
            >
              제목
            </label>
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
            <label
              htmlFor="content"
              className="text-[16px] leading-[24px] font-normal text-[#364153]"
            >
              내용
            </label>
            <div
              className={[
                'h-full w-full overflow-hidden rounded-[8px] bg-[#F4F4F5]',
                isPending ? 'pointer-events-none opacity-70' : '',
              ].join(' ')}
            >
              <MarkdownEditor
                name="content"
                draftId={draftId}
                defaultValue={state.values?.content ?? initialValues.content ?? ''}
                onChange={setPreviewContent}
              />
            </div>

            {state.fieldErrors.content && (
              <ErrorMessage errorMessage={state.fieldErrors.content?.[0]} />
            )}
          </div>

          {state.message && <ErrorMessage errorMessage={state.message} />}

          <div className="w-full lg:hidden">
            <PostWritingGuide />
          </div>
        </section>

        {/* 우측: (데스크탑만) 작성 가이드 + 미리보기 */}
        <aside className="hidden w-full flex-col gap-[20px] lg:flex lg:w-[569px]">
          <PostWritingGuide />

          <section className="box-border flex w-full flex-col items-start gap-[24px] rounded-[10px] border border-[#E5E7EB] bg-white p-[33px]">
            <p className="text-[16px] leading-[24px] font-normal text-black">미리보기</p>

            <div className="w-full overflow-y-auto bg-white lg:min-h-[734px]">
              {previewContent ? (
                <MarkdownViewer content={previewContent} />
              ) : (
                <p className="text-[14px] leading-[20px] text-[#717182]">
                  왼쪽 에디터에 내용을 입력하면 여기에서 미리 보기가 표시됩니다.
                </p>
              )}
            </div>
          </section>
        </aside>
      </Form>
    </div>
  )
}
