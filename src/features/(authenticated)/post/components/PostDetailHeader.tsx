'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'

type DeleteAction = (formData: FormData) => void | Promise<void>

export function PostDetailHeader({
  title = '게시글',
  fallbackHref = '/',
  postId,
  isOwner = false,
  deletePostAction,
}: {
  title?: string
  fallbackHref?: string
  postId?: number
  isOwner?: boolean
  deletePostAction?: DeleteAction
}) {
  const router = useRouter()

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }
    router.replace(fallbackHref)
  }

  const iconBase = 'text-[rgba(55,56,60,0.61)]'
  const btnBase =
    'flex h-[36px] w-[36px] items-center justify-center rounded-[8px] focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none'

  return (
    <header className="fixed inset-x-0 top-0 z-30 h-(--header-h) border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex h-full w-full max-w-(--container-max) items-center px-4">
        {/* 좌측: 뒤로 */}
        <button type="button" onClick={handleGoBack} className={btnBase} aria-label="뒤로가기">
          <ArrowLeft size={16} className="text-[#0A0A0A]" />
        </button>

        {/* 가운데 타이틀 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] leading-6 font-normal text-[#101828]">
          {title}
        </h1>

        {/* 우측: 오너면 수정/삭제 */}
        <div className="ml-auto flex items-center gap-2">
          {isOwner && postId ? (
            <>
              <Link
                href={`/post/${postId}/edit`}
                aria-label="수정"
                className={`${btnBase} hover:bg-[#F9FAFB]`}
              >
                <Pencil size={20} className={iconBase} />
              </Link>

              {deletePostAction && (
                <form action={deletePostAction}>
                  <button
                    type="submit"
                    aria-label="삭제"
                    className={`${btnBase} group hover:bg-[#FEF2F2]`}
                    // TODO: 삭제 토스트 추가
                  >
                    <Trash2 size={20} className={`${iconBase} group-hover:text-[#E7000B]`} />
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="h-[36px] w-[80px]" aria-hidden />
          )}
        </div>
      </div>
    </header>
  )
}
