'use client'

import React from 'react'
import Select from '@/components/ui/Select'
import { useRoleStore } from '@/store/role.store'
import { UserRole } from '@/features/(authenticated)/admin/root/types/AdminPage.types'

export default function ActionSelect({
  userId,
  initialRole,
  disabled,
}: {
  userId: number
  initialRole: UserRole
  disabled?: boolean
}) {
  const setRole = useRoleStore((s) => s.setRole)

  return (
    <Select
      name={`role-${userId}`}
      onChange={(e) => {
        const value = (e.target as HTMLSelectElement).value
        setRole(userId, value as UserRole)
      }}
      defaultValue={initialRole}
      options={[
        { value: 'MEMBER', label: '학생' },
        { value: 'INSTRUCTOR', label: '강사' },
        { value: 'BLOCKED', label: '차단' },
      ]}
    />
  )
}
