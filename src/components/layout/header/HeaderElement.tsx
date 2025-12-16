import React from 'react'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import Button from '@/components/ui/button/Button'
import AvatarButton from '@/components/layout/header/AvatarButton'
import { Search, SquarePen } from 'lucide-react'

export default function HeaderElement({ location }: { location: locationTypes }) {
  const isHome = location === 'board'
  const isContentCreatePage = location === 'content'

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="w-[400px]">
        <Input icon={<Search size={16} color="#99A1AF" />} type="search" />
      </div>
      <div className="flex items-center gap-3">
        {isHome && (
          <>
            <Link href="/content">
              <Button icon={<SquarePen size={16} />}>글쓰기</Button>
            </Link>
            <AvatarButton />
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
