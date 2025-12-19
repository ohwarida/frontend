'use client'

import React from 'react'
import './Button.css'
import clsx from 'clsx'

export type ButtonVariant = 'add' | 'cancel' | 'warning'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  icon?: React.ReactNode
  variant?: ButtonVariant
}

const Button = (props: ButtonProps) => {
  const { children, className, variant = 'add', icon, ...rest } = props
  const variantClass = {
    add: 'btn-add',
    cancel: 'btn-cancel',
    warning: 'btn-warning',
  }[variant]

  return (
    <button {...rest} className={clsx('btn-basic', variantClass, className)}>
      {icon && <div>{icon}</div>}
      <span>{children}</span>
    </button>
  )
}

export default Button
