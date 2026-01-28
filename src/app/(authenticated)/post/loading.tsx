import React from 'react'
import clsx from 'clsx'
import Logo from '@/components/ui/Logo'

export default async function Loading() {
  return (
    <div className="mx-0 size-full bg-(--app-bg)">
      <header className={clsx('z-20 h-(--header-h) border-b border-[#E5E7EB] bg-white')}>
        <div className="mx-auto flex h-full w-full max-w-(--container-max) items-center px-5">
          <div className="shrink-0"></div>
          <div className="ml-auto flex items-center gap-3">
            <div className="size-8 rounded-full border border-gray-300" />
          </div>
        </div>
      </header>
      <div className="lg:hidden">
        <div className="flex h-12 w-full items-center bg-white px-4">
          <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>

      <div className="lg:pt-6">
        <section
          aria-busy="true"
          role="status"
          aria-label="게시글 불러오는 중"
          className={[
            'bg-white px-4 pb-25 lg:pb-6',
            'lg:mx-auto lg:w-full lg:max-w-[1377px] lg:rounded-lg lg:p-8',
          ].join(' ')}
        >
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-3 border-b border-[#F3F4F6] py-4 lg:gap-8 lg:border-0 lg:py-0">
              <header className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 w-3 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 w-3 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-[22px] w-16 animate-pulse rounded-lg bg-gray-200" />
                </div>

                <div className="hidden h-7 w-[72px] items-center gap-4 lg:flex">
                  <div className="h-7 w-7 animate-pulse rounded-md bg-gray-200" />
                  <div className="h-7 w-7 animate-pulse rounded-md bg-gray-200" />
                </div>
              </header>

              <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200 lg:h-12" />
            </div>

            {/* 본문 스켈레톤 */}
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={[
                    'h-4 animate-pulse rounded bg-gray-200',
                    i % 3 === 0 ? 'w-5/6' : i % 3 === 1 ? 'w-full' : 'w-4/6',
                  ].join(' ')}
                />
              ))}
            </div>

            <ul className="flex flex-wrap gap-2 lg:gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="h-4 w-16 animate-pulse rounded bg-gray-200 lg:h-6 lg:w-20" />
              ))}
            </ul>
            {/* 리액션/댓글 영역 대충 자리만 */}
            <div className="h-10 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-[118px] w-full animate-pulse rounded-xl bg-gray-200" />
          </div>

          {/* 이전/다음/목록 */}
          <div className="mt-9 space-y-9">
            <div className="flex items-center gap-4">
              <div className="h-20 w-full animate-pulse rounded-2xl bg-gray-200" />
              <div className="h-20 w-full animate-pulse rounded-2xl bg-gray-200" />
            </div>

            <div className="flex items-center justify-center">
              <div className="h-9 w-44 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
