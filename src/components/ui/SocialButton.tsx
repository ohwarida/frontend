import React from 'react'

export default function SocialButton({
  children,
  socialIcon,
}: {
  children: React.ReactNode
  socialIcon: React.ReactNode
}) {
  return (
    <button className="flex items-center gap-6 rounded-2xl bg-white px-6 py-3 shadow-md">
      {socialIcon && <div></div>}
      {children}
    </button>
  )
}
