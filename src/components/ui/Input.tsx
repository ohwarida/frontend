import React from 'react'
import clsx from 'clsx'

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputClassName?: string
  icon?: React.ReactNode
}

export default function Input({ required = false, icon, ...props }: BaseInputProps) {
  const { inputClassName, ...rest } = props
  return (
    <div className="relative">
      <input
        className={clsx(
          'h-10 w-full rounded-md bg-gray-200 py-2.5 pr-3 text-xs focus:ring-1 focus:ring-gray-300',
          icon ? 'pl-8.5' : 'pl-3',
          inputClassName,
        )}
        placeholder="검색어를 입력하세요..."
        {...rest}
      />
      {icon && (
        <span className="absolute inset-y-0 left-2 flex items-center justify-center">{icon}</span>
      )}
    </div>
  )
}
