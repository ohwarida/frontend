'use client'

import React from 'react'
import { useGoogleSignin } from '@/features/(public)/signin/useGoogleSignin'
import { Loader2 } from 'lucide-react'

type SocialButtonProps = {
  children: React.ReactNode
  socialIcon: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function SocialButton({ children, socialIcon, disabled }: SocialButtonProps) {
  const { signWithGoogle, isLoading } = useGoogleSignin()

  return (
    <button
      type="button"
      onClick={signWithGoogle}
      disabled={disabled || isLoading}
      className="relative flex h-[50px] w-full items-center justify-center rounded-full border border-gray-200 bg-white px-5 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
    >
      {/* 아이콘은 왼쪽에 고정 */}
      <span className="absolute left-5 inline-flex h-5 w-5 items-center justify-center">
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : socialIcon}
      </span>

      {/* 텍스트는 버튼 기준 정중앙 */}
      <span className="text-[18px] leading-7 font-medium text-[#364153]">{children}</span>
    </button>
  )
}
