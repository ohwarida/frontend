import React from 'react'

export default async function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-0 lg:flex-row lg:px-5">
        {children}
      </div>
    </div>
  )
}
