'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { CircleUserRound } from 'lucide-react'

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

const sizePx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  const normalizedSrc = useMemo(() => (src ?? '').trim(), [src])
  const hasImage = normalizedSrc.length > 0 && !imgError
  const px = sizePx[size]

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full',
        'bg-transparent',
        sizeClasses[size],
        className,
      )}
    >
      {hasImage ? (
        <Image
          src={normalizedSrc}
          alt={alt ?? name ?? 'Avatar'}
          fill
          sizes={`${px}px`}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <CircleUserRound size={px} strokeWidth={1} className="text-black" />
      )}
    </div>
  )
}
