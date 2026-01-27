import React from 'react'
import Aside from '@/components/layout/aside/Aside'
import { PageButton } from '@/components/layout/PageButton'
import Main from '@/components/layout/Main'
import AppShell from '@/components/layout/header/AppShell'
import CategoryFilter from '@/components/layout/CategoryFilter'
import FloatingNav from '@/components/layout/FloatingNav'
import { TABS } from '@/features/(authenticated)/post/constants/tabs'
import { FeedbackToast } from '@/components/ui/FeedbackToast'

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
        <FeedbackToast />
      </Main>
    </AppShell>
  )
}
