import PageCard from '@/components/PageCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '지식 | Wanted Ground PotenUp',
  description: '모두의 지식을 공유하는 게시판입니다.',
}

export default function KnowledgePage() {
  return (
    <div>
      <PageCard />
    </div>
  )
}
