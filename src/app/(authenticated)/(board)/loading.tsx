import React from 'react'
import { Loading } from '@/components/loading/Loading'

export default async function BoardLoading() {
  return (
    <div className="flex min-h-[calc(100dvh-var(--header-h)-var(--page-pb)-88px)] flex-col items-center justify-center lg:pb-6">
      <Loading label="게시물을 불러오고 있습니다." />
    </div>
  )
}
