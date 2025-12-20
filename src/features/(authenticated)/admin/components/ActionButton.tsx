'use client'

import React from 'react'
import Button, { ButtonVariant } from '@/components/ui/button/Button'
import clsx from 'clsx'
import { UserRequestStatus, UserRole } from '@/features/(authenticated)/admin/types/AdminPage.types'
import { decisionUser } from '@/features/(authenticated)/admin/services/decisionUser'
import { useRoleStore } from '@/store/roleStore'

export default function ActionButton({
  userId,
  initialRole,
  status,
  disabled,
  variant,
  content,
}: {
  userId: number
  initialRole: UserRole
  status: UserRequestStatus
  disabled?: boolean
  variant?: ButtonVariant
  content: string
}) {
  const role = useRoleStore((s) => s.rolesByUserId[userId] ?? initialRole)
  const decision = async () => {
    await decisionUser({ id: userId, role, requestStatus: status })
  }

  return (
    <Button
      variant={variant}
      onClick={decision}
      disabled={disabled}
      className={clsx(disabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : '')}
    >
      {content}
    </Button>
  )
}
