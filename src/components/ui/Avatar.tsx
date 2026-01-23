'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { CircleUserRound } from 'lucide-react'
import { IS_PROD } from '@/constants/env'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
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
  xl: 'h-12 w-12 text-base',
  '2xl': 'h-14 w-14 text-base',
  '3xl': 'h-16 w-16 text-base',
  '4xl': 'h-18 w-18 text-base',
  '5xl': 'h-20 w-20 text-base',
  '6xl': 'h-30 w-30 text-base',
}

const sizePx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 60,
  '2xl': 72,
  '3xl': 84,
  '4xl': 96,
  '5xl': 108,
  '6xl': 168,
}

export function Avatar({ src, alt, name, size = 'sm', className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  const normalizedSrc = useMemo(() => (src ?? '').trim(), [src])
  const hasImage = normalizedSrc.length > 0 && !imgError
  const px = sizePx[size]

  return (
    <div
      className={clsx(
        'relative flex items-center justify-center overflow-hidden rounded-full',
        'shrink-0 border border-gray-100 bg-transparent',
        sizeClasses[size],
        className,
      )}
    >
      {hasImage ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE}${normalizedSrc}`}
          alt={alt ?? name ?? 'Avatar'}
          fill
          sizes={`${px}px`}
          className="object-cover"
          onError={() => setImgError(true)}
          unoptimized={!IS_PROD}
        />
      ) : (
        <CircleUserRound size={px} strokeWidth={1} color="#989BA2" />
      )}
    </div>
  )
}
