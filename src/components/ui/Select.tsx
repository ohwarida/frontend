'use client'

import React from 'react'
import clsx from 'clsx'

export type SelectOption<T extends string = string> = {
  value: T | ''
  label: string
  disabled?: boolean
}

type SelectProps<T extends string = string> = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  options: ReadonlyArray<SelectOption<T>>
  placeholder?: string
}

export default function Select<T extends string = string>({
  name,
  options,
  placeholder = '선택하세요',
  defaultValue = '',
  className,
  ...rest
}: SelectProps<T>) {
  return (
    <select
      name={name}
      defaultValue={defaultValue ?? ''}
      className={clsx(
        'min-h-7 w-full rounded-md border border-gray-200 bg-white pl-2 text-xs text-gray-500 focus:ring-1 focus:ring-gray-300',
        className,
      )}
      {...rest}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((opt) => (
        <option key={opt.value || '__empty__'} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
