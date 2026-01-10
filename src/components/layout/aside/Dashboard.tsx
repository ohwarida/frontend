'use client'

import { MessageSquare, Users } from 'lucide-react'
import StatCard from './StatCard'
import { useGetDashboardQuery } from '@/features/(authenticated)/board/queries/useDashboard'

export default function Dashboard() {
  const { data } = useGetDashboardQuery()

  const totalPostCount = data?.totalPostCount ?? 0
  const totalUsers = data?.totalUsers ?? 0

  return (
    data && (
      <section className="w-full space-y-3 rounded-[8px] border border-[#EAEBEC] bg-white p-4">
        <StatCard
          label="전체 게시글"
          value={totalPostCount.toLocaleString()}
          icon={<MessageSquare className="size-4" strokeWidth={1.5} />}
          variant="blue"
        />
        <StatCard
          label="활동 멤버"
          value={totalUsers.toLocaleString()}
          icon={<Users className="size-4" strokeWidth={1.5} />}
          variant="green"
        />
        {/* <StatCard
        label="이번 주 조회수"
        value={views.toLocaleString()}
        icon={<Activity className="size-4" strokeWidth={1.5} />}
        variant="orange"
      /> */}
      </section>
    )
  )
}
