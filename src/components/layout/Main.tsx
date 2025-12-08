import React from 'react';

export default async function Main({children}: { children: React.ReactNode }) {
  return (
    <main className='bg-gray-50 min-h-screen'>
      <div className="mx-auto min-h-screen max-w-7xl px-5 flex gap-5">
        {children}
      </div>
    </main>
  )
}
