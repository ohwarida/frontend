import React from 'react'
import PageCard from '@/components/PageCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '회고 | Wanted Ground PotenUp',
  description: '경험을 회고하고 인사이트를 공유하는 회고 게시판입니다.',
}

export default async function retrospectPage() {
  return (
    <div>
      <PageCard />
    </div>
  )
}
