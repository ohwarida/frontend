import React from 'react'
import PageCard from '@/components/PageCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '공지사항 | Wanted Ground PotenUp',
  description: '서비스 운영 및 업데이트 관련 공지사항을 확인할 수 있는 게시판입니다.',
}

export default async function NoticePage() {
  return (
    <div>
      <PageCard />
    </div>
  )
}
