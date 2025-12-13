import React from 'react'
import Logo from '@/components/ui/Logo'
import HeaderElement from '@/components/layout/header/HeaderElement'

export default async function AppShell({
  children,
  location,
}: {
  children: React.ReactNode
  location: locationTypes
}) {
  return (
    <>
      <header className="fixed inset-x-0 z-20 flex h-20 max-h-20 min-h-20 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto flex size-full max-w-7xl items-center gap-4 px-5">
          <Logo />

          <HeaderElement location={location} />
        </div>
      </header>

      <div className="min-h-full w-full pt-[80px]">{children}</div>
    </>
  )
}
