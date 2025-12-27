import React from 'react'
import Aside from '@/components/layout/aside/Aside'
import PageButton from '@/components/layout/PageButton'
import Main from '@/components/layout/Main'
import AppShell from '@/components/layout/header/AppShell'
import { TOPIC_LABEL, TOPIC_TYPE } from '@/types/Topic.types'
import { Briefcase, House, FileText, MessageCircle } from 'lucide-react'
import CategoryFilter from '@/components/layout/CategoryFilter'
import FloatingNav from '@/components/layout/FloatingNav'

export const TABS = [
  { id: TOPIC_TYPE.ALL, label: TOPIC_LABEL.ALL, href: '/', icon: <House /> },
  { id: TOPIC_TYPE.NOTICE, label: TOPIC_LABEL.NOTICE, href: '/notice', icon: <FileText /> },
  {
    id: TOPIC_TYPE.EMPLOYMENT_TIP,
    label: TOPIC_LABEL.EMPLOYMENT_TIP,
    href: '/job-tips',
    icon: <Briefcase />,
  },
  // { id: TOPIC_TYPE.TREND, label: TOPIC_LABEL.TREND, href: '/trend', icon: <TrendingUp /> },
  {
    id: TOPIC_TYPE.KNOWLEDGE,
    label: TOPIC_LABEL.KNOWLEDGE,
    href: '/knowledge',
    icon: <MessageCircle />,
  },
]

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell location="board">
      <Main>
        <Aside />

        <section className="w-full">
          <PageButton TABS={TABS} />
          <CategoryFilter TABS={TABS} />
          <div className="flex flex-col gap-0 lg:gap-4">{children}</div>
        </section>

        <FloatingNav />
      </Main>
    </AppShell>
  )
}
