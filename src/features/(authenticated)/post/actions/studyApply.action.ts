'use server'

import { revalidatePath } from 'next/cache'
import { applyStudy } from '@/features/(authenticated)/post/apis/study.api'
import type { ApplyStudyRequest } from '@/features/(authenticated)/post/types/study.type'

export type StudyApplyValues = {
  studyId: number | null
  appeal: string
}

export type StudyApplyFormState = {
  success: boolean
  message?: string
  fieldErrors?: Partial<Record<keyof StudyApplyValues, string>>
  values?: StudyApplyValues
}

export async function applyStudyAction(
  _prevState: StudyApplyFormState,
  formData: FormData,
): Promise<StudyApplyFormState> {
  const studyIdRaw = formData.get('studyId')
  const appeal = String(formData.get('appeal') ?? '')

  const values: StudyApplyValues = {
    studyId: toIntOrNull(studyIdRaw),
    appeal,
  }

  const fieldErrors = validateApply(values)
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, values, fieldErrors, message: '입력값을 다시 확인해 주세요.' }
  }

  const input: ApplyStudyRequest = {
    appeal: values.appeal.trim(),
  }

  try {
    await applyStudy(values.studyId!, input)

    revalidatePath('/study')
    revalidatePath(`/study/${values.studyId!}`)
    revalidatePath('/mypage/recruitments') // 실제 경로 있으면 맞춰줘. 없으면 삭제

    return { success: true, values, fieldErrors: {} }
  } catch {
    return {
      success: false,
      values,
      fieldErrors: {},
      message: '스터디 신청에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    }
  }
}

function toIntOrNull(v: FormDataEntryValue | null) {
  if (v == null) return null
  const n = Number(String(v))
  return Number.isFinite(n) ? n : null
}

function validateApply(values: StudyApplyValues) {
  const errors: Partial<Record<keyof StudyApplyValues, string>> = {}

  if (values.studyId == null) errors.studyId = '스터디 정보가 올바르지 않습니다.'

  if (!values.appeal.trim()) errors.appeal = '신청 메시지를 입력해 주세요.'
  else if (values.appeal.trim().length > 200)
    errors.appeal = '신청 메시지는 200자 이하로 입력해 주세요.'

  return errors
}
