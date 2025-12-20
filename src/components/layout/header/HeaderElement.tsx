import Link from 'next/link'
import Button from '@/components/ui/button/Button'
import ProfileMenu from '@/components/layout/header/ProfileMenu'
import { SquarePen } from 'lucide-react'
import { locationType } from '@/types/Location.types'

export default function HeaderElement({ location }: { location: locationType }) {
  const isHome = location === 'board'
  const isContentCreatePage = location === 'content/create'

  return (
    <div className="flex items-center gap-3">
      {/* 검색 넣을 거면 아래처럼 “필요할 때만” flex로 확장 */}
      {/* <div className="mr-2 w-[400px]">
        <Input icon={<Search size={16} color="#99A1AF" />} type="search" />
      </div> */}

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
  )
}
