'use client'

import React from 'react'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import Button from '@/components/ui/button/Button'
import ProfileMenu from '@/components/layout/header/ProfileMenu'
import { Search, Shield, SquarePen } from 'lucide-react'
import { useAuthState } from '@/app/hooks/useAuthState'

export default function HeaderElement({ location }: { location: locationTypes }) {
  const isHome = location === 'board'
  const isContentCreatePage = location === 'content'

  const { user } = useAuthState()
  const isAdmin = user?.role === 'ADMIN'

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="w-[400px]">
        <Input icon={<Search size={16} color="#99A1AF" />} type="search" />
      </div>
      <div className="flex items-center gap-3">
        {isAdmin && (
          <>
            <Link href="/">
              <Button variant="cancel">관리자 모드 종료</Button>
            </Link>
            <Link href="/admin">
              <Button variant="warning" icon={<Shield size={16} />}>
                관리자 모드
              </Button>
            </Link>
          </>
        )}
        {isHome && (
          <>
            <Link href="/content">
              <Button icon={<SquarePen size={16} />}>글쓰기</Button>
            </Link>
            <ProfileMenu />
          </>
        )}
        {isContentCreatePage && (
          <>
            <Link href="/">
              <Button variant="cancel">취소</Button>
            </Link>
            <Button variant="add" type="submit" form="postFormId">
              발행하기
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
