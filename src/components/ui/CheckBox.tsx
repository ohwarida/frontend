'use client'

import React from 'react'
import clsx from 'clsx'

type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  onCheckedChange?: (checked: boolean) => void
}

export default function CheckBox({ onCheckedChange, className, ...rest }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      className={clsx(
        'h-4 w-4 rounded border-gray-300 bg-white text-blue-600',
        'focus:ring-2 focus:ring-blue-200',
        rest.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className ?? '',
      )}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...rest}
    />
  )
}
