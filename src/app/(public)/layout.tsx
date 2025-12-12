import React from 'react'
import Background from '@/components/Background'
import Footer from '@/components/layout/Footer'
import Logo from '@/components/ui/Logo'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden">
      <Background />
      <header className="z-10 flex h-20 max-h-20 min-h-20 items-center bg-transparent">
        <div className="mx-auto flex size-full max-w-7xl items-center gap-4 px-5">
          <Logo />
        </div>
      </header>
      <main className="z-10 h-full bg-transparent">{children}</main>
      <Footer />
    </div>
  )
}
