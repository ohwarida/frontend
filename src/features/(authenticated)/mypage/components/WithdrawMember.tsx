'use client'

import type React from 'react'

type WithdrawMemberProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export default function WithdrawMember({ children, ...rest }: WithdrawMemberProps) {
  return (
    <button className="relative w-full text-gray-700" disabled {...rest}>
      {children}
    </button>
  )
}
