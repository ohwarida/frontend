import React from 'react'
import Message from '@/components/ui/Message'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '게시판 | Wanted Ground PotenUp',
  description: '취업 팁, Q&A, 공지사항 등 다양한 게시판을 한 곳에서 확인할 수 있습니다.',
}

export default async function TotalPage() {
  return (
    <div>
      <Message message="현재 데이터가 존재하지 않습니다." />
    </div>
  )
}
