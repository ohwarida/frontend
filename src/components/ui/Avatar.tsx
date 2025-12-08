'use client'

import React from 'react'
import clsx from 'clsx'
import {getInitial} from "@/utils/getInitial";

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

export const Avatar = ({
                         src,
                         alt,
                         name,
                         size = 'md',
                         className,
                       }: AvatarProps) => {
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
        <img
          src={src ?? ''}
          alt={alt ?? name ?? 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-medium">{getInitial(name)}</span>
      )}
    </div>
  )
}
