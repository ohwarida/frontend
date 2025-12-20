import React from 'react'
import Aside from '@/components/layout/aside/Aside'
import PageButton from '@/components/layout/PageButton'
import Main from '@/components/layout/Main'
import AppShell from '@/components/layout/header/AppShell'
import {
  TOPIC_LABEL,
  TOPIC_TYPE,
} from '@/features/(authenticated)/content/create/types/Topic.types'

const TABS = [
  { id: TOPIC_TYPE.ALL, label: TOPIC_LABEL.ALL, href: '/' },
  { id: TOPIC_TYPE.NOTICE, label: TOPIC_LABEL.NOTICE, href: '/notice' },
  { id: TOPIC_TYPE.EMPLOYMENT_TIP, label: TOPIC_LABEL.EMPLOYMENT_TIP, href: '/job-tips' },
  { id: TOPIC_TYPE.TREND, label: TOPIC_LABEL.TREND, href: '/trend' },
  { id: TOPIC_TYPE.KNOWLEDGE, label: TOPIC_LABEL.KNOWLEDGE, href: '/knowledge' },
]

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell location="board">
      <Main>
        <Aside />

        <section className="w-full">
          <PageButton TABS={TABS} />
          <div className="pt-4">{children}</div>
        </section>
      </Main>
    </AppShell>
  )
}
