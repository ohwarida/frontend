'use client'

import React from 'react'
import { useGoogleSignin } from '@/features/(public)/sign/useGoogleSignin'
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
      disabled={disabled}
      className="flex h-10 max-h-10 min-h-10 w-[320px] max-w-[320px] min-w-[320px] items-center gap-6 rounded-2xl border border-gray-200 bg-white px-20 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {socialIcon && (
        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
          <span className="inline-flex h-5 w-5 items-center justify-center">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : socialIcon}
          </span>
        </div>
      )}
      <span className="text-sm font-medium text-gray-900">{children}</span>
    </button>
  )
}
