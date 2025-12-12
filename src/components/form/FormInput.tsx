import React from 'react'
import Required from '@/components/ui/Required'
import Input from '@/components/ui/Input'
import ErrorMessage from '@/components/ui/ErrorMessage'
import clsx from 'clsx'
import Label from '@/components/ui/Label'

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errorMessage?: string
  name: string
  inputClassName?: string
  outerClassName?: string
}

export default function FormInput(props: FormInputProps) {
  const { label, errorMessage, required, name, inputClassName, outerClassName, ...rest } = props
  return (
    <div className={clsx('flex flex-col gap-1', outerClassName)}>
      {label && (
        <div className="flex items-center">
          <Label name={name} label={label} />
          {required && <Required />}
        </div>
      )}
      <Input
        required={required}
        name={name}
        aria-label={label}
        aria-labelledby={label}
        inputClassName={inputClassName}
        {...rest}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  )
}
