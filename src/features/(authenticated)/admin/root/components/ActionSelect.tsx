'use client'

import React, { useEffect } from 'react'
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
  const initRole = useRoleStore((s) => s.initRole)
  const setRole = useRoleStore((s) => s.setRole)

  useEffect(() => {
    initRole(userId, initialRole)
  }, [userId, initialRole, initRole])

  return (
    <Select
      name={`role-${userId}`}
      disabled={disabled}
      onChange={(e) => {
        const next = (e.target as HTMLSelectElement).value as UserRole
        setRole(userId, next)
      }}
      defaultValue={initialRole}
      options={[
        { value: 'ADMIN', label: '관리자' },
        { value: 'MEMBER', label: '학생' },
        { value: 'INSTRUCTOR', label: '강사' },
      ]}
    />
  )
}
