import React from 'react'
import { ReactGoogleProvider } from '@/app/_providers/_index'

export default async function Layout({
  children,
  panel,
}: {
  children: React.ReactNode
  panel: React.ReactNode
}) {
  return (
    <ReactGoogleProvider>
      {children}
      {panel}
    </ReactGoogleProvider>
  )
}
