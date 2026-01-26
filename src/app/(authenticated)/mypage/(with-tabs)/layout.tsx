import React from 'react'
import { MyPageTabs } from '@/features/(authenticated)/mypage/components/MyPageTabs'

export default function WithTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MyPageTabs />
      <div className="flex flex-col gap-0 lg:gap-4">{children}</div>
    </>
  )
}
