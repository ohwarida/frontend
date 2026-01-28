'use client'

import React, { useActionState, useCallback, useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import {
  createStudyAction,
  type StudyFormState,
} from '@/features/(authenticated)/post/actions/studyCreate.action'
import { StudyBudget } from '@/features/(authenticated)/post/types/study.type'

type CreateStudyModalProps = {
  returnTo?: string
  backdropClassName?: string
  fixedTrack?: {
    id: number
    name: string
  }
}

type FormState = {
  name: string
  capacity: string
  description: string
  chatUrl: string
  refUrl: string
}

export function CreateStudyModal({ returnTo = '/study', fixedTrack }: CreateStudyModalProps) {
  const router = useRouter()

  const [state, formAction] = useActionState<StudyFormState, FormData>(createStudyAction, {
    success: false,
  })

  const [tags, setTags] = useState<string[]>([])
  const [budget, setBudget] = useState<StudyBudget | ''>('')
  const [form, setForm] = useState<FormState>({
    name: '',
    capacity: '',
    description: '',
    chatUrl: '',
    refUrl: '',
  })

  const close = useCallback(() => {
    router.replace(returnTo)
    router.refresh()
  }, [router, returnTo])

  useEffect(() => {
    if (!state?.success) return
    close()
  }, [state?.success, close])

  const capacityNum = useMemo(() => {
    const n = Number(form.capacity)
    return Number.isFinite(n) ? n : NaN
  }, [form.capacity])

  const isCapacityValid = Number.isFinite(capacityNum) && capacityNum >= 2 && capacityNum <= 9

  const isRequiredFilled = useMemo(() => {
    const hasTrack = Boolean(fixedTrack?.id)
    const hasName = form.name.trim().length > 0
    const hasDesc = form.description.trim().length > 0
    const hasChat = form.chatUrl.trim().length > 0
    const hasBudget = Boolean(budget)

    return hasTrack && hasName && isCapacityValid && hasDesc && hasChat && hasBudget
  }, [fixedTrack?.id, form.name, form.description, form.chatUrl, isCapacityValid, budget])

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setForm((prev) => ({ ...prev, [key]: value }))
    }

  const clampCapacityOnBlur = () => {
    if (form.capacity.trim() === '') return
    const n = Number(form.capacity)
    if (!Number.isFinite(n)) {
      setForm((p) => ({ ...p, capacity: '' }))
      return
    }
    const clamped = Math.min(9, Math.max(2, n))
    setForm((p) => ({ ...p, capacity: String(clamped) }))
  }

  return (
    <div
      className={[
        'relative',
        'w-[min(600px,calc(100vw-32px))]',
        'max-h-[calc(100vh-64px)]',
        'flex flex-col',
        'overflow-hidden rounded-[10px] border border-black/10 bg-white',
        'shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]',
      ].join(' ')}
    >
      {/* Header */}
      <div className="shrink-0 px-[25px] pt-[25px]">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-[18px] leading-[18px] font-semibold text-[#0A0A0A]">
              스터디 / 프로젝트 만들기
            </h2>
            <p className="text-[14px] leading-5 font-normal text-[#717182]">
              새로운 스터디나 프로젝트를 만들어 동료들을 모집해보세요.
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-[2px] inline-flex h-8 w-8 items-center justify-center rounded-[8px] opacity-70 hover:bg-black/5"
            aria-label="닫기"
          >
            <X size={16} className="text-[#0A0A0A]" />
          </button>
        </div>
      </div>

      <form action={formAction} className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto px-[25px] pt-[16px]">
          {fixedTrack?.id != null && <input type="hidden" name="trackId" value={fixedTrack.id} />}
          <input type="hidden" name="budget" value={budget} />
          {tags.map((t) => (
            <input key={t} type="hidden" name="tags" value={t} />
          ))}

          <div className="space-y-[16px]">
            <div className="flex gap-4">
              <Field label="트랙 *">
                <SelectButton
                  placeholder="트랙 선택"
                  value={fixedTrack?.name}
                  disabled={Boolean(fixedTrack)}
                />
              </Field>

              <Field label="기수 / 진행 기간">
                <SelectButton placeholder="기간 선택" />
                {/* TODO: 기간 선택 값 생기면 hidden input 추가 */}
              </Field>
            </div>

            <Field label="스터디 제목 *">
              <Input
                name="name"
                placeholder="예: 프론트엔드 성능 최적화 스터디"
                value={form.name}
                onChange={onChange('name')}
              />
              {state?.fieldErrors?.name && <ErrorText>{state.fieldErrors.name}</ErrorText>}
            </Field>

            <Field label="모집 인원 (최대) *">
              <Input
                name="capacity"
                type="number"
                inputMode="numeric"
                min={2}
                max={9}
                placeholder="예: 6 (2~9)"
                value={form.capacity}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === '') return setForm((p) => ({ ...p, capacity: '' }))
                  if (/^\d+$/.test(v)) setForm((p) => ({ ...p, capacity: v }))
                }}
                onBlur={clampCapacityOnBlur}
              />
              <Hint ok={isCapacityValid || form.capacity.trim() === ''}>
                모집 인원은 <b>2~9</b> 사이로 입력해주세요.
              </Hint>
              {state?.fieldErrors?.capacity && <ErrorText>{state.fieldErrors.capacity}</ErrorText>}
            </Field>

            <Field label="예산(지원 방식) *">
              <BudgetSelect value={budget} onChange={setBudget} />
              <Hint ok={Boolean(budget)}>예산을 선택해 주세요.</Hint>
              {state?.fieldErrors?.budget && <ErrorText>{state.fieldErrors.budget}</ErrorText>}
            </Field>

            <Field label="소개 및 목표 *">
              <Textarea
                name="description"
                placeholder="어떤 주제로 스터디를 진행하나요? 목표와 진행 방식을 자유롭게 적어주세요."
                value={form.description}
                onChange={onChange('description')}
              />
              {state?.fieldErrors?.description && (
                <ErrorText>{state.fieldErrors.description}</ErrorText>
              )}
            </Field>

            <Field label="태그 (최대 10개)">
              <TagInput tags={tags} onChange={setTags} />
              {state?.fieldErrors?.tags && <ErrorText>{state.fieldErrors.tags}</ErrorText>}
            </Field>

            <div className="flex gap-4">
              <Field label="오픈채팅방 링크 (승인 시 공개) *">
                <Input
                  name="chatUrl"
                  placeholder="https://open.kakao.com/..."
                  value={form.chatUrl}
                  onChange={onChange('chatUrl')}
                />
                {state?.fieldErrors?.chatUrl && <ErrorText>{state.fieldErrors.chatUrl}</ErrorText>}
              </Field>

              <Field label="참고 링크 (선택)">
                <Input
                  name="refUrl"
                  placeholder="예: https://..."
                  value={form.refUrl}
                  onChange={onChange('refUrl')}
                />
              </Field>
            </div>

            {state?.message && !state.success && <ErrorBanner>{state.message}</ErrorBanner>}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-[25px] py-[16px]">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className={[
                'h-9 rounded-[8px] px-4 text-[14px] leading-5 font-medium',
                'border border-black/10 bg-white text-[#0A0A0A]',
                'hover:bg-black/5',
              ].join(' ')}
            >
              취소
            </button>

            <SubmitButton enabled={isRequiredFilled} />
          </div>
        </div>
      </form>
    </div>
  )
}

function SubmitButton({ enabled }: { enabled: boolean }) {
  const { pending } = useFormStatus()
  const disabled = !enabled || pending

  return (
    <button
      type="submit"
      disabled={disabled}
      className={[
        'h-9 rounded-[8px] px-4 text-[14px] leading-5 font-medium',
        'border',
        disabled
          ? 'cursor-not-allowed border-black/10 bg-black/10 text-[#0A0A0A]/40'
          : 'border-transparent bg-[#030213] text-white hover:opacity-95',
      ].join(' ')}
    >
      {pending ? '생성 중...' : '모집 시작하기'}
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-[14px] leading-[14px] font-medium text-[#0A0A0A]">{label}</label>
      {children}
    </div>
  )
}

function Hint({ children, ok }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <p className={['text-[12px] leading-4', ok ? 'text-[#717182]' : 'text-red-600'].join(' ')}>
      {children}
    </p>
  )
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] leading-4 text-red-600">{children}</p>
}

function ErrorBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] leading-5 text-red-700">
      {children}
    </div>
  )
}

function Input({
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  min,
  max,
  inputMode,
}: {
  placeholder?: string
  name?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  type?: React.HTMLInputTypeAttribute
  min?: number
  max?: number
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <input
      name={name}
      type={type}
      min={min}
      max={max}
      inputMode={inputMode}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={[
        'h-9 w-full rounded-[8px] px-3 text-[14px] leading-[17px] outline-none',
        'border border-black/10 bg-white',
        'shadow-[0px_1px_3px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08)]',
        'placeholder:text-[#717182]',
        'focus:border-black/20 focus:ring-2 focus:ring-black/5',
      ].join(' ')}
    />
  )
}

function Textarea({
  placeholder,
  name,
  value,
  onChange,
}: {
  placeholder?: string
  name?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={[
        'h-[96px] w-full resize-none rounded-[8px] px-3 py-2 text-[14px] leading-5 outline-none',
        'border border-black/10 bg-[#F3F3F5]',
        'placeholder:text-[#717182]',
        'focus:border-black/20 focus:ring-2 focus:ring-black/5',
      ].join(' ')}
    />
  )
}

function SelectButton({
  placeholder,
  value,
  disabled,
}: {
  placeholder: string
  value?: string
  disabled?: boolean
}) {
  const text = value ?? placeholder
  const isPlaceholder = !value

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'flex h-9 w-full items-center justify-between rounded-[8px] px-3 text-[14px] leading-5',
        'border border-black/10 bg-[#F3F3F5]',
        isPlaceholder ? 'text-[#717182]' : 'text-[#0A0A0A]',
        disabled ? 'cursor-not-allowed opacity-70' : 'hover:bg-black/5',
      ].join(' ')}
    >
      <span className="truncate">{text}</span>
      <span aria-hidden className="opacity-50">
        ▾
      </span>
    </button>
  )
}

function BudgetSelect({
  value,
  onChange,
}: {
  value: '' | StudyBudget
  onChange: (v: '' | StudyBudget) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <BudgetChip active={value === 'BOOK'} onClick={() => onChange('BOOK')}>
        도서비
      </BudgetChip>
      <BudgetChip active={value === 'MEAL'} onClick={() => onChange('MEAL')}>
        식비
      </BudgetChip>
    </div>
  )
}

function BudgetChip({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'h-9 w-full rounded-[8px] px-3 text-[14px] leading-5 font-medium',
        'border border-black/10',
        active ? 'bg-[#030213] text-white' : 'bg-white text-[#0A0A0A] hover:bg-black/5',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/** 태그 입력 컴포넌트 */
function TagInput({
  tags,
  onChange,
  max = 10,
}: {
  tags: string[]
  onChange: (next: string[]) => void
  max?: number
}) {
  const [input, setInput] = useState('')
  const [isComposing, setIsComposing] = useState(false)

  const normalized = (v: string) => v.trim().replace(/^#+/, '').replace(/\s+/g, '')
  const canAdd = tags.length < max

  const addTag = (raw: string) => {
    const v = normalized(raw)
    if (!v) return
    if (!canAdd) return

    const withHash = v.startsWith('#') ? v : `#${v}`

    if (tags.some((t) => t.toLowerCase() === withHash.toLowerCase())) return

    onChange([...tags, withHash])
    setInput('')
  }

  const removeTag = (target: string) => {
    onChange(tags.filter((t) => t !== target))
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const composing = isComposing || e.nativeEvent?.isComposing
    if (composing) return

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(e.currentTarget.value)
      return
    }
    if (e.key === 'Backspace' && !e.currentTarget.value && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div className="w-full rounded-[8px] border border-black/10 bg-[#F3F3F5] px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-[6px] bg-white px-2 py-1 text-[12px] leading-4 text-[#0A0A0A] shadow-[0px_1px_2px_rgba(0,0,0,0.06)]"
          >
            {t}
            <button
              type="button"
              onClick={() => removeTag(t)}
              className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] opacity-70 hover:bg-black/5"
              aria-label={`${t} 삭제`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setIsComposing(false)
            setInput(e.currentTarget.value)
          }}
          disabled={!canAdd}
          placeholder={canAdd ? '예: React, 성능최적화 (Enter로 추가)' : '태그는 최대 10개까지'}
          className={[
            'min-w-[160px] flex-1 bg-transparent text-[14px] leading-5 outline-none placeholder:text-[#717182]',
            !canAdd ? 'cursor-not-allowed opacity-70' : '',
          ].join(' ')}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[12px] leading-4 text-[#717182]">
        <span>Enter(또는 ,)로 추가 · Backspace로 마지막 태그 삭제</span>
        <span>
          {tags.length}/{max}
        </span>
      </div>
    </div>
  )
}
