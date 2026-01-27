'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function MyPageHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const isProfilePage = pathname === '/mypage/profile'

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }
    // 프로필 페이지에서 뒤로 fallback은 마이페이지로 보내는게 UX상 더 자연스러움
    router.replace(isProfilePage ? '/mypage' : '/')
  }

  const iconBtn =
    'flex h-[36px] w-[36px] items-center justify-center rounded-[8px] focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none'

  const profileBtn =
    'inline-flex h-[32px] items-center justify-center rounded-[8px] px-[12px] ' +
    'bg-[#030213]/50 text-white text-[14px] leading-5 font-medium ' +
    'focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none'

  return (
    <header className="fixed inset-x-0 top-0 z-30 h-(--header-h) border-b border-[#E5E7EB] bg-white">
      <div className="relative mx-auto flex h-full w-full max-w-(--container-max) items-center px-4">
        {/* 좌측: 뒤로 */}
        <button type="button" onClick={handleGoBack} className={iconBtn} aria-label="뒤로가기">
          <ArrowLeft size={16} className="text-[#0A0A0A]" />
        </button>

        {/* 가운데 타이틀 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] leading-6 font-medium text-[#101828]">
          {isProfilePage ? '프로필 설정' : '마이페이지'}
        </h1>

        {/* 우측 */}
        {isProfilePage ? (
          // 레이아웃 흔들림 방지용(옵션): 버튼 자리 폭 유지
          <div className="ml-auto h-[32px] w-[61px]" aria-hidden />
        ) : (
          <Link href="/mypage/profile" className={`ml-auto ${profileBtn}`}>
            프로필
          </Link>
        )}
      </div>
    </header>
  )
}
