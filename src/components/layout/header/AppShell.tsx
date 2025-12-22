import React from 'react'
import Logo from '@/components/ui/Logo'
import HeaderElement from '@/components/layout/header/HeaderElement'
import { LocationType } from '@/types/Location.types'
import { PostCreateHeader } from '@/features/(authenticated)/post/create/components/PostCreateHeader'

export default async function AppShell({
  children,
  location,
}: {
  children: React.ReactNode
  location: LocationType
}) {
  const isPostCreatePage = location === 'post/create'

  return (
    <>
      {isPostCreatePage ? (
        <PostCreateHeader title="글쓰기" formId="postFormId" />
      ) : (
        <header className="fixed inset-x-0 top-0 z-20 h-(--header-h) border-b border-[#E5E7EB] bg-white">
          <div className="mx-auto flex h-full w-full max-w-(--container-max) items-center px-5">
            <div className="shrink-0">
              <Logo />
            </div>
            <div className="ml-auto flex items-center">
              <HeaderElement location={location} />
            </div>
          </div>
        </header>
      )}

      <main className="min-h-dvh w-full bg-(--app-bg) pt-(--header-h) pb-[calc(var(--page-pb)+env(safe-area-inset-bottom))]">
        <div className="mx-auto w-full max-w-(--container-max) px-5 pt-6">{children}</div>
      </main>
    </>
  )
}
