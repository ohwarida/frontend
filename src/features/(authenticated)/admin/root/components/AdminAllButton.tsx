'use client'

import React from 'react'
import Button from '@/components/ui/button/Button'
import { useAdminSelectionStore } from '@/store/adminSelection.store'
import { acceptAllUser } from '@/features/(authenticated)/admin/root/services/acceptAllUser'

export default function AdminAllButton({ trackId }: { trackId: number }) {
  const selectedIds = useAdminSelectionStore((s) => s.selectedIds)
  const clear = useAdminSelectionStore((s) => s.clear)
  const allAccept = async () => {
    console.log(selectedIds)
    await acceptAllUser({ ids: selectedIds, trackId })
    clear()
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button variant="add" disabled={selectedIds.length === 0} onClick={allAccept}>
        선택 승인
      </Button>
    </div>
  )
}
