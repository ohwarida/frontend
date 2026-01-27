'use server'

import { revalidatePath } from 'next/cache'
import { updateStudy } from '@/features/(authenticated)/post/apis/study.api'
import type {
  UpdateStudyRequest,
  StudyBudget,
} from '@/features/(authenticated)/post/types/study.type'

export type StudyUpdateValues = {
  studyId: number | null
  name: string
  capacity: number | null
  budget: StudyBudget | null
  description: string
  chatUrl: string
  refUrl?: string | null
  tags: string[]
}

export type StudyUpdateFormState = {
  success: boolean
  message?: string
  fieldErrors?: Partial<Record<keyof StudyUpdateValues, string>>
  values?: StudyUpdateValues
}

export async function updateStudyAction(
  _prevState: StudyUpdateFormState,
  formData: FormData,
): Promise<StudyUpdateFormState> {
  const studyIdRaw = formData.get('studyId')

  const name = String(formData.get('name') ?? '')
  const capacityRaw = formData.get('capacity')
  const budgetRaw = String(formData.get('budget') ?? '')
  const description = String(formData.get('description') ?? '')
  const chatUrl = String(formData.get('chatUrl') ?? '')
  const refUrlRaw = formData.get('refUrl')

  const tagsRaw = [...formData.getAll('tags').map(String), ...formData.getAll('tags[]').map(String)]
  const tags = uniq(
    tagsRaw
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`)),
  )

  const values: StudyUpdateValues = {
    studyId: toIntOrNull(studyIdRaw),
    name,
    capacity: toIntOrNull(capacityRaw),
    budget: budgetRaw && isBudgetType(budgetRaw) ? budgetRaw : null,
    description,
    chatUrl,
    refUrl: String(refUrlRaw ?? '').trim() || null,
    tags,
  }

  const fieldErrors = validateStudy(values)
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, values, fieldErrors, message: '입력값을 다시 확인해 주세요.' }
  }

  const input: UpdateStudyRequest = {
    name: values.name.trim(),
    capacity: values.capacity!,
    budget: values.budget!,
    description: values.description.trim(),
    chatUrl: values.chatUrl.trim(),
    refUrl: values.refUrl || undefined,
    tags: values.tags,
  }

  try {
    await updateStudy(values.studyId!, input)

    // 목록/상세 둘 다 쓰면 둘 다 revalidate하는 게 안전
    revalidatePath('/study')
    revalidatePath(`/study/${values.studyId!}`)

    return { success: true, values, fieldErrors: {} }
  } catch {
    return {
      success: false,
      values,
      fieldErrors: {},
      message: '스터디 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }
}

function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function isBudgetType(v: string): v is StudyBudget {
  return v === 'BOOK' || v === 'MEAL'
}

function toIntOrNull(v: FormDataEntryValue | null) {
  if (v == null) return null
  const n = Number(String(v))
  return Number.isFinite(n) ? n : null
}

function uniq(arr: string[]) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const x of arr) {
    const k = x.toLowerCase()
    if (seen.has(k)) continue
    seen.add(k)
    out.push(x)
  }
  return out
}

function validateStudy(values: StudyUpdateValues) {
  const errors: Partial<Record<keyof StudyUpdateValues, string>> = {}

  if (values.studyId == null) errors.studyId = '스터디 정보가 올바르지 않습니다.'

  if (!values.name.trim()) errors.name = '스터디 제목을 입력해 주세요.'

  if (values.capacity == null || Number.isNaN(values.capacity)) {
    errors.capacity = '모집 인원을 입력해 주세요.'
  } else if (values.capacity < 2 || values.capacity > 9) {
    errors.capacity = '모집 인원은 2~9 사이여야 합니다.'
  }

  if (!values.budget) errors.budget = '예산(지원 방식)을 선택해 주세요.'
  if (!values.description.trim()) errors.description = '소개 및 목표를 입력해 주세요.'

  if (!values.chatUrl.trim()) errors.chatUrl = '오픈채팅방 링크를 입력해 주세요.'
  else if (!isValidUrl(values.chatUrl)) errors.chatUrl = '올바른 URL 형식이 아닙니다.'

  if (values.refUrl && values.refUrl.trim() && !isValidUrl(values.refUrl)) {
    errors.refUrl = '올바른 URL 형식이 아닙니다.'
  }

  if (values.tags.length > 10) errors.tags = '태그는 최대 10개까지 가능합니다.'

  return errors
}
