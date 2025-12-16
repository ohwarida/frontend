'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { User } from 'lucide-react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
type AvatarProps = {
  src?: string | null
  alt?: string
  name?: string
  size?: AvatarSize
  className?: string
}
const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-600',
        'border border-gray-200',
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <Image
          src={src ?? ''}
          alt={alt ?? name ?? 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium">
          {/* TODO: 아이콘 수정 필요 */}
          <User size={20} />
        </span>
      )}
    </div>
  )
}
