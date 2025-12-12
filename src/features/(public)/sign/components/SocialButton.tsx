'use client'

import React from 'react'
import { useGoogleSignin } from '@/features/(public)/sign/useGoogleSignin'

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
      className="flex items-center gap-6 rounded-2xl bg-white px-6 py-3 shadow-md disabled:cursor-not-allowed disabled:opacity-60"
    >
      {socialIcon && <div className="shrink-0">{socialIcon}</div>}
      <span className="text-sm font-medium text-gray-900">{children}</span>
    </button>
  )
}
