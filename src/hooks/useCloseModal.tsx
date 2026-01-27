'use client'

import { useRouter } from 'next/navigation'

export function useCloseModal(returnTo?: string) {
  const router = useRouter()

  return () => {
    // intercept 모달은 back이 우선
    router.back()

    // 만약 새로고침으로 바로 모달 URL로 들어온 경우(히스토리 없음) 대비
    if (returnTo) {
      setTimeout(() => router.replace(returnTo), 0)
    }
  }
}
