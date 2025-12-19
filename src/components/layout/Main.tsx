import React from 'react'

export default async function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl gap-5 px-5">{children}</div>
    </main>
  )
}
