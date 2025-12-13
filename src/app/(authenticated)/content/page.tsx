import React from 'react'
import ContentCreateForm from '@/features/(authenticated)/content/create/components/ContentCreateForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '게시글 작성 | Wanted Ground PotenUp',
  description: '새 게시글을 작성하는 페이지입니다.',
}

export default async function CreateContentPage() {
  return <ContentCreateForm />
}
