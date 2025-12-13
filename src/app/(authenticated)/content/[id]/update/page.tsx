import React from 'react'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // const post = await server<{ title: string }>(`/api/v1/posts/${params.id}`, { method: 'GET', cache: 'no-store' })

  return {
    title: `title ㄱㄱ | 게시글 수정 | Potenup`,
    description: '게시글 내용을 수정할 수 있는 페이지입니다.',
  }
}

export default async function ContentUpdatePage() {
  return <div></div>
}
