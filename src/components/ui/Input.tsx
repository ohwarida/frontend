import React, { useRef } from 'react'
import clsx from 'clsx'
import { Calendar } from 'lucide-react'

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
}

export default function Input({ icon, ...props }: BaseInputProps) {
  const { className, placeholder, ...rest } = props
  const isDate = rest.type === 'date'
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="relative">
      <input
        // date일 때만 ref 연결 (그 외에는 불요)
        ref={isDate ? inputRef : undefined}
        className={clsx(
          'h-10 w-full rounded-md border border-gray-200 bg-white py-2.5 pr-3 text-xs outline-none focus:ring-0 focus:ring-gray-300',
          icon ? 'pl-8.5' : 'pl-3',
          isDate &&
            '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:h-8 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0',
          isDate && 'pr-12',
          className,
        )}
        placeholder={placeholder ?? '입력하세요'}
        {...rest}
      />

      {icon && (
        <span className="absolute inset-y-0 left-2 flex items-center justify-center">{icon}</span>
      )}

      {isDate && (
        <button
          type="button"
          aria-label="날짜 선택"
          onClick={() => {
            const el = inputRef.current
            el?.showPicker?.()
            el?.focus()
          }}
          className="group absolute inset-0 right-2 flex items-center justify-end"
        >
          <span className="flex size-8 items-center justify-center rounded-md transition-colors group-hover:bg-gray-100">
            <Calendar className="size-5" />
          </span>
        </button>
      )}
    </div>
  )
}
