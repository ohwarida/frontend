'use client'

import Link from 'next/link'
import Button from '@/components/ui/button/Button'
import ProfileMenu from '@/components/layout/header/ProfileMenu'
import { Shield, SquarePen } from 'lucide-react'
import { useAuthState } from '@/app/hooks/useAuthState'
import type { LocationType } from '@/types/Location.types'

export default function HeaderElement({ location }: { location: LocationType }) {
  const isHomePage = location === 'board'
  const isAdminPage = location === 'admin'

  const { user } = useAuthState()
  const isAdmin = user?.role === 'ADMIN'

  return (
    <div className="flex items-center gap-3">
      {isAdmin &&
        (isAdminPage ? (
          <Link href="/">
            <Button variant="cancel">관리자 모드 종료</Button>
          </Link>
        ) : (
          <Link href="/admin/1">
            <Button variant="warning" icon={<Shield size={16} />}>
              관리자 모드
            </Button>
          </Link>
        ))}

      {isHomePage && (
        <Link href="/post/create" className="hidden sm:inline-flex">
          <Button icon={<SquarePen size={16} />}>글쓰기</Button>
        </Link>
      )}

      <ProfileMenu />
    </div>
  )
}
