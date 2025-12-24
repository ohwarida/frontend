import { MessageSquare, Users } from 'lucide-react'
import StatCard from './StatCard'
import { getDashboard } from '@/features/(authenticated)/board/apis/dashboard.api'

export default async function Dashboard() {
  const { totalPostCount, totalUsers } = await getDashboard()

  return (
    <section className="w-full space-y-3 rounded-[8px] border border-[#EAEBEC] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
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
}
