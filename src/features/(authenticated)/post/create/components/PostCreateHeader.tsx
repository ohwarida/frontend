'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ProfileMenu from '@/components/layout/header/ProfileMenu'

export function PostCreateHeader({
  title = '글쓰기',
  formId = 'postFormId',
  isPending = false,
  cancelFallbackHref = '/',
}: {
  title?: string
  formId?: string
  isPending?: boolean
  cancelFallbackHref?: string
}) {
  const router = useRouter()

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }
    router.push(cancelFallbackHref)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-(--header-h) border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex h-full w-full max-w-(--container-max) items-center justify-between px-5">
        {/* 좌측 */}
        <div className="flex h-[36px] items-center gap-2">
          <button
            type="button"
            onClick={goBack}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px]"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={16} className="text-[#0A0A0A]" />
          </button>

          <h1 className="text-[24px] leading-[36px] font-normal text-[#101828]">{title}</h1>
        </div>

        {/* 우측 */}
        <div className="flex h-[36px] items-center justify-end gap-3">
          <button
            type="button"
            onClick={goBack}
            className="h-[36px] rounded-[8px] border border-[rgba(0,0,0,0.1)] bg-white px-4 text-[14px] leading-[20px] font-medium text-[#0A0A0A]"
          >
            취소
          </button>

          <button
            type="submit"
            form={formId}
            disabled={isPending}
            className={[
              'h-[36px] rounded-[8px] bg-[#155DFC] px-4 text-[14px] leading-[20px] font-medium text-white',
              isPending ? 'opacity-50' : 'opacity-100',
            ].join(' ')}
          >
            발행하기
          </button>

          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}
