'use client'

import { Activity, MessageSquare, Users } from 'lucide-react'
import StatCard from './StatCard'

export default function Dashboard() {
  // 조회 API 연동
  const posts = 1234
  const members = 456
  const views = 658

  return (
    <section className="w-full space-y-3 rounded-md border border-gray-200 bg-white p-4">
      <StatCard
        label="전체 게시글"
        value={posts.toLocaleString()}
        icon={<MessageSquare size={16} />}
        variant="blue"
      />
      <StatCard
        label="활동 멤버"
        value={members.toLocaleString()}
        icon={<Users size={16} />}
        variant="green"
      />
      <StatCard
        label="이번 주 조회수"
        value={views.toLocaleString()}
        icon={<Activity size={16} />}
        variant="orange"
      />
    </section>
  )
}
