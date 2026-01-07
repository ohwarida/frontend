'use client'

import React from 'react'
import CheckBox from '@/components/ui/CheckBox'
import { useAdminSelectionStore } from '@/store/adminSelection.store'

export default function AdminCheckBox({ id }: { id: number }) {
  const checked = useAdminSelectionStore((s) => s.selectedIds.includes(id))
  const setSelected = useAdminSelectionStore((s) => s.setSelected)

  return (
    <div className="flex w-full items-center justify-center">
      <CheckBox
        checked={checked}
        onCheckedChange={(v) => setSelected(id, v)}
        aria-label={`${id} 선택`}
      />
    </div>
  )
}
