'use server'

import { server, safeJson } from '@/lib/api/server'
import {
  ApplyStudyRequest,
  CreateStudyRequest,
  CreateStudyResponse,
  GetMyRecruitmentsResponse,
  GetStudiesParams,
  GetStudiesResponse,
  GetStudyRecruitmentsResponse,
  UpdateStudyRequest,
  UpdateStudyResponse,
} from '@/features/(authenticated)/post/types/study.type'

// 스터디 조회
export async function getStudies(params: GetStudiesParams = {}): Promise<GetStudiesResponse> {
  const searchParams = new URLSearchParams()

  if (typeof params.trackId === 'number') searchParams.set('trackId', String(params.trackId))
  if (params.status) searchParams.set('status', params.status)
  if (typeof params.page === 'number') searchParams.set('page', String(params.page))
  if (typeof params.size === 'number') searchParams.set('size', String(params.size))
  if (params.sort) searchParams.set('sort', params.sort)

  const query = searchParams.toString()

  const res = await server(`/api/v1/studies${query ? `?${query}` : ''}`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('스터디 목록 조회 실패')

  const data = await safeJson<GetStudiesResponse>(res)
  if (!data) throw new Error('스터디 목록 응답이 비어있음')
  return data
}

// 스터디 생성
export async function createStudy(input: CreateStudyRequest): Promise<CreateStudyResponse> {
  const res = await server(`/api/v1/studies`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('스터디 생성 실패')

  const data = await safeJson<CreateStudyResponse>(res)
  if (!data) throw new Error('스터디 생성 응답이 비어있음')
  return data
}

// 스터디 수정
export async function updateStudy(studyId: number, input: UpdateStudyRequest) {
  const res = await server(`/api/v1/studies/${studyId}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('스터디 수정 실패')
  if (res.status === 204) return null
  return await safeJson<UpdateStudyResponse>(res)
}

// 스터디 삭제
export async function deleteStudy(studyId: number): Promise<{ ok: true }> {
  const res = await server(`/api/v1/studies/${studyId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('스터디 삭제 실패')
  return { ok: true }
}

// 스터디 신청
export async function applyStudy(studyId: number, input: ApplyStudyRequest) {
  const res = await server(`/api/v1/studies/${studyId}/recruitments`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('스터디 신청 실패')
  if (res.status === 201) return null
  return await safeJson(res)
}

// 스터디 신청 반려(스터디장)
export async function rejectRecruitment(studyId: number, recruitmentId: number) {
  const res = await server(`/api/v1/studies/${studyId}/recruitments/${recruitmentId}/reject`, {
    method: 'PATCH',
  })
  if (!res.ok) throw new Error('스터디 신청 반려 실패')
  if (res.status === 204) return null
  return await safeJson(res)
}

// 스터디 신청 승인(스터디장)
export async function approveRecruitment(studyId: number, recruitmentId: number) {
  const res = await server(`/api/v1/studies/${studyId}/recruitments/${recruitmentId}/approve`, {
    method: 'PATCH',
  })
  if (!res.ok) throw new Error('스터디 신청 승인 실패')
  if (res.status === 204) return null
  return await safeJson(res)
}

// 스터디 신청자 목록 조회(스터디장)
export async function getStudyRecruitments(studyId: number) {
  const res = await server(`/api/v1/users/me/studies/${studyId}/recruitments`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('스터디 신청자 목록 조회 실패')
  const data = await safeJson<GetStudyRecruitmentsResponse>(res)
  if (!data) throw new Error('스터디 신청 목록 응답이 비어있음')
  return data
}

// 내 신청 목록 조회
export async function getMyRecruitments() {
  const res = await server(`/api/v1/users/me/recruitments`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error('내 신청 목록 조회 실패')

  const data = await safeJson<GetMyRecruitmentsResponse>(res)
  if (!data) throw new Error('내 신청 목록 응답이 비어있음')
  return data
}

// 스터디 신청 취소
export async function cancelMyRecruitment(studyId: number) {
  const res = await server(`/api/v1/users/me/studies/${studyId}/recruitments`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('스터디 신청 취소 실패')
  return { ok: true }
}

// TODO: 스터디 일정 생성
// TODO: 스터디 일정 삭제
// TODO: 스터디 일정 수정
// TODO: 스터디 반려(관리자)
// TODO: 스터디 승인(관리자)
