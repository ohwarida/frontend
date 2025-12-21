import React from 'react'
import Logo from '@/components/ui/Logo'
import HeaderElement from '@/components/layout/header/HeaderElement'
import { LocationType } from '@/types/Location.types'

export default async function AppShell({
  children,
  location,
}: {
  children: React.ReactNode
  location: LocationType
}) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 h-(--header-h) border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex h-full w-full max-w-(--container-max) items-center px-5">
          <div className="shrink-0">
            <Logo />
          </div>

          {/* 오른쪽 영역 */}
          <div className="ml-auto flex items-center">
            <HeaderElement location={location} />
          </div>
        </div>
      </header>

      <main className="min-h-dvh w-full bg-(--app-bg) pt-(--header-h)">
        <div className="mx-auto w-full max-w-(--container-max) px-5 pt-6">{children}</div>
      </main>
    </>
  )
}
