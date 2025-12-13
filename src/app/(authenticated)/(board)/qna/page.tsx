import React from 'react'
import PageCard from '@/components/PageCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Q&A | Wanted Ground PotenUp',
  description: '질문과 답변을 통해 함께 문제를 해결하는 Q&A 게시판입니다.',
}

export default async function QnAPage() {
  return (
    <div>
      <PageCard />
    </div>
  )
}
