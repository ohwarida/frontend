'use client'

import React from 'react'
import Button, { ButtonVariant } from '@/components/ui/button/Button'
import clsx from 'clsx'
import {
  UserRequestStatus,
  UserRole,
} from '@/features/(authenticated)/admin/root/types/AdminPage.types'
import { decisionUser } from '@/features/(authenticated)/admin/root/services/decisionUser'
import { useRoleStore } from '@/store/role.store'

export default function ActionButton({
  trackId,
  userId,
  initialRole,
  requestStatus,
  disabled,
  variant,
  content,
}: {
  trackId: number
  userId: number
  initialRole: UserRole
  requestStatus: UserRequestStatus
  disabled?: boolean
  variant?: ButtonVariant
  content: string
}) {
  const role = useRoleStore((s) => s.rolesByUserId[userId] ?? initialRole)
  const isChanged = useRoleStore((s) => s.changedByUserId[userId] ?? false)
  const finalDisabled = requestStatus === 'REJECTED' ? !!disabled : !isChanged && !!disabled

  const decision = async () => await decisionUser({ id: userId, role, requestStatus, trackId })

  return (
    <Button
      variant={variant}
      onClick={decision}
      disabled={finalDisabled}
      className={clsx(finalDisabled && 'cursor-not-allowed bg-gray-100 text-gray-400')}
    >
      {content}
    </Button>
  )
}
