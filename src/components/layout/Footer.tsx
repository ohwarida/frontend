'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  if (pathname === '/signup') return null
  return (
    <footer className="py-6 text-center text-sm text-gray-500">
      © 2025 Depth. All rights reserved.
    </footer>
  )
}
