import React from 'react'
import PageTitle from '@/components/ui/PageTitle'
import CommentCard from '@/components/CommentCard'

export default async function CommentPage() {
  return (
    <div>
      <PageTitle
        title="내가 쓴 댓글"
        subTitle="여러분의 활발한 소통이 우리 커뮤니티를 더욱 즐거운 공간으로 만듭니다."
      />
      <div className="mt-3">
        <CommentCard></CommentCard>
      </div>
    </div>
  )
}
