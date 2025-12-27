import React from 'react'
import clsx from 'clsx'
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
  const isPostDetailPage = location === 'post'

  return (
    <>
      {isPostCreatePage ? (
        <PostCreateHeader title="글쓰기" formId="postFormId" />
      ) : (
        <header
          className={clsx(
            'fixed inset-x-0 top-0 z-20 h-(--header-h) border-b border-[#E5E7EB] bg-white',
            isPostDetailPage && 'hidden lg:block',
          )}
        >
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

      <main
        className={clsx(
          'min-h-dvh w-full pt-(--header-h) pb-[calc(var(--page-pb)+env(safe-area-inset-bottom))]',
          isPostCreatePage || isPostDetailPage ? 'bg-white lg:bg-(--app-bg)' : 'bg-(--app-bg)',
        )}
      >
        <div
          className={clsx(
            'mx-auto w-full max-w-(--container-max)',
            isPostCreatePage ? 'px-4 pt-4 lg:px-5 lg:pt-6' : 'px-0 pt-0 lg:px-5 lg:pt-6',
          )}
        >
          {children}
        </div>
      </main>
    </>
  )
}
