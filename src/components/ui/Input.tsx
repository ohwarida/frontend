import React from 'react'
import clsx from 'clsx'

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
}

export default function Input({ icon, ...props }: BaseInputProps) {
  const { className, placeholder, ...rest } = props

  return (
    <div className="relative">
      <input
        className={clsx(
          'h-10 w-full rounded-md border border-gray-200 bg-white py-2.5 pr-3 text-xs outline-none focus:ring-0 focus:ring-gray-300',
          icon ? 'pl-8.5' : 'pl-3',
          className,
        )}
        placeholder={placeholder ?? '입력하세요'}
        {...rest}
      />
      {icon && (
        <span className="absolute inset-y-0 left-2 flex items-center justify-center">{icon}</span>
      )}
    </div>
  )
}
