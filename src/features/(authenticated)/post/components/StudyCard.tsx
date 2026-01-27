'use client'

import React from 'react'
import { CircleCheckBig, Pencil, Trash2, Users } from 'lucide-react'
import type { StudyCardItem, StudyStatus } from '../types/study.type'
import { useRouter } from 'next/navigation'

export function StudyCard({
  item,
  myRecruitmentStatus,
  onDelete,
}: {
  item: StudyCardItem
  myRecruitmentStatus?: StudyStatus | null
  onDelete?: (studyId: number) => void
}) {
  const router = useRouter()

  const isLeader = Boolean(item.isLeader)

  const cohortLabel = (() => {
    const m = item.schedule?.month
    if (!m) return '-'
    const s = String(m)
    if (s.includes('차') || s.includes('개월')) return s
    return `${s}개월차`
  })()

  // 모집글 상태 (스터디 자체)
  const isClosed = item.status === 'CLOSED' || item.isRecruitmentClosed

  // 내 신청 상태 (Recruitment.status)
  const isApplyPending = myRecruitmentStatus === 'PENDING'
  const isRejected = myRecruitmentStatus === 'REJECTED'
  const isApproved = myRecruitmentStatus === 'APPROVED'

  const ctaDisabled = isLeader ? false : isClosed || isApplyPending || isRejected

  const ctaLabel = isLeader
    ? isClosed
      ? '모집 마감됨'
      : '신청자 관리하기'
    : isClosed
      ? '모집 마감'
      : isApplyPending
        ? '신청 완료'
        : isRejected
          ? '신청 반려'
          : '참여 신청하기'

  const notReady = (feature: string) => {
    alert(`서비스 준비중입니다. (${feature})`)
  }

  const handlePrimary = () => {
    if (ctaDisabled) return

    if (isLeader) {
      // TODO: 신청자 관리 페이지 연동
      // router.push(`/study/${item.id}/recruitments`)
      notReady('신청자 관리')
      return
    }

    // TODO: 스터디 신청 모달/페이지 연동
    // router.push(`/study/apply/${item.id}`)
    notReady('스터디 신청')
  }

  const handleEdit = () => {
    // TODO: 스터디 수정 모달/페이지 연동
    // router.push(`/study/edit/${item.id}`)
    notReady('스터디 수정')
  }

  const handleDelete = () => {
    // TODO: 스터디 삭제 서버 액션 연동
    // const ok = window.confirm('정말 삭제할까요? 삭제 후에는 되돌릴 수 없어요.')
    // if (!ok) return
    // onDelete?.(item.id)

    notReady('스터디 삭제')
  }

  return (
    <article
      className={[
        'box-border rounded-[10px] border border-[#E5E7EB] bg-white',
        'w-full md:w-[510px]',
        'min-h-[320px] md:h-[360px]',
        'flex flex-col gap-3',
        'p-4 md:p-6',
      ].join(' ')}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-2">
          <StatusBadge status={item.status} />
          <span className="text-[14px] leading-5 font-medium text-[#6A7282]">{item.track}</span>
          <CohortChip text={cohortLabel} />
        </div>

        <div className="flex items-center gap-3">
          <MemberCount current={item.currentMemberCount} max={item.capacity} />

          {/* 리더면 우측 상단 액션 */}
          {isLeader && (
            <div className="flex items-center gap-1">
              <IconButton label="수정" onClick={handleEdit}>
                <Pencil size={16} />
              </IconButton>
              <IconButton label="삭제" onClick={handleDelete}>
                <Trash2 size={16} />
              </IconButton>
            </div>
          )}
        </div>
      </div>

      <h3 className="w-full text-[18px] leading-7 font-bold text-[#101828]">{item.name}</h3>

      <p className="w-full flex-1 overflow-hidden text-[14px] leading-5 font-normal text-[#4A5565]">
        {item.description}
      </p>

      <div className="mt-auto flex w-full flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 10).map((t) => (
            <span
              key={t}
              className="inline-flex h-6 items-center rounded-[4px] bg-[#F9FAFB] px-2 text-[12px] leading-4 font-normal text-[#6A7282]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* 승인된 참여자면 기존 ApprovedBox 유지 */}
        {!isLeader && isApproved ? (
          <ApprovedBox chatUrl={item.chatUrl} />
        ) : (
          <PrimaryButton disabled={ctaDisabled} label={ctaLabel} onClick={handlePrimary} />
        )}
      </div>
    </article>
  )
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-black/10 bg-white text-[#0A0A0A] opacity-80 hover:bg-black/5"
    >
      {children}
    </button>
  )
}

function StatusBadge({ status }: { status: StudyStatus }) {
  if (status === 'PENDING') {
    return (
      <span className="rounded-[8px] bg-[#DBEAFE] px-2 py-[2px] text-[12px] leading-4 font-medium text-[#1447E6]">
        모집중
      </span>
    )
  }
  if (status === 'CLOSED') {
    return (
      <span className="rounded-[8px] bg-[#ECEEF2] px-2 py-[2px] text-[12px] leading-4 font-medium text-[#030213]">
        마감
      </span>
    )
  }
  return (
    <span className="rounded-[8px] bg-[#DBEAFE] px-2 py-[2px] text-[12px] leading-4 font-medium text-[#1447E6]">
      모집완료
    </span>
  )
}

function CohortChip({ text }: { text: string }) {
  return (
    <span className="inline-flex h-5 items-center rounded-[4px] bg-[#F3F4F6] px-2 text-[12px] leading-4 font-normal text-[#4A5565]">
      {text}
    </span>
  )
}

function MemberCount({ current, max }: { current: number; max: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[14px] leading-5 font-normal text-[#6A7282]">
      <Users size={16} />
      {current}/{max}
    </span>
  )
}

function PrimaryButton({
  disabled,
  label,
  onClick,
}: {
  disabled?: boolean
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'h-9 w-full rounded-[8px] text-[14px] leading-5 font-medium text-white',
        disabled
          ? 'cursor-not-allowed bg-[#155DFC] opacity-50'
          : 'bg-[#155DFC] hover:brightness-[0.97] active:translate-y-[1px]',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function ApprovedBox({ chatUrl }: { chatUrl: string }) {
  return (
    <div className="box-border w-full rounded-[4px] border border-[#DCFCE7] bg-[#F0FDF4] px-[13px] pt-[13px] pb-[9px]">
      <div className="flex items-center gap-2 text-[14px] leading-5 font-normal text-[#016630]">
        <CircleCheckBig size={16} />
        참여 승인됨
      </div>

      <a
        href={chatUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex h-8 w-full items-center justify-center gap-2 rounded-[8px] border border-[rgba(0,0,0,0.1)] bg-white text-[12px] leading-4 font-medium text-[#0A0A0A] hover:bg-[#FAFAFA] active:translate-y-[1px]"
      >
        <span aria-hidden>💬</span>
        오픈채팅
      </a>
    </div>
  )
}
