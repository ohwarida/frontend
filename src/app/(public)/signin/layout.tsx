import React from 'react'

export default async function Layout({
  children,
  panel,
}: {
  children: React.ReactNode
  panel: React.ReactNode
}) {
  return (
    <>
      {children}
      {panel}
    </>
  )
}
