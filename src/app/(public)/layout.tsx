import React from 'react'
import Footer from '@/components/layout/Footer'
import Logo from '@/components/ui/Logo'
import Background3 from '@/components/Background3'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Background3 />
      <header className="relative z-10 h-20 shrink-0">
        <div className="mx-auto flex h-full max-w-7xl items-center px-5">
          <Logo />
        </div>
      </header>
      <main className="relative z-10 flex-1">
        <div className="mx-auto h-full max-w-7xl pt-10 md:pt-14">{children}</div>
      </main>
      <div className="relative z-10 shrink-0">
        <Footer />
      </div>
    </div>
  )
}
