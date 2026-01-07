'use client'

import React, { useMemo } from 'react'
import CheckBox from '@/components/ui/CheckBox'
import { useAdminSelectionStore } from '@/store/adminSelection.store'

export default function AdminSelectAllCheckBox({ ids }: { ids: number[] }) {
  const selectedIds = useAdminSelectionStore((s) => s.selectedIds)
  const setAll = useAdminSelectionStore((s) => s.setAll)
  const removeMany = useAdminSelectionStore((s) => s.removeMany)
  const idSet = useMemo(() => new Set(ids), [ids])
  const selectedCountOnThisPage = useMemo(() => {
    let c = 0
    for (const id of selectedIds) if (idSet.has(id)) c++
    return c
  }, [selectedIds, idSet])
  const allChecked = ids.length > 0 && selectedCountOnThisPage === ids.length

  return (
    <div className="flex w-full items-center justify-center">
      <CheckBox
        checked={allChecked}
        onCheckedChange={(v) => {
          if (v)
            setAll(ids) // 전체 선택
          else removeMany(ids) // 전체 해제(현재 페이지 ids만)
        }}
        aria-label="전체 선택"
      />
    </div>
  )
}
