'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { CircleUserRound, LogOut } from 'lucide-react'

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 바깥 클릭 닫기
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current
      if (!root) return
      if (!root.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown, { capture: true })
    return () => document.removeEventListener('pointerdown', onPointerDown, { capture: true })
  }, [])

  // ESC 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // 열리면 첫 메뉴로 포커스(접근성/키보드용)
  useEffect(() => {
    if (!open) return
    const first = menuRef.current?.querySelector<HTMLElement>('[data-menuitem]')
    first?.focus()
  }, [open])

  const focusMove = (dir: 1 | -1) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[data-menuitem]') ?? [],
    )
    if (items.length === 0) return

    const active = document.activeElement as HTMLElement | null
    const idx = Math.max(
      0,
      items.findIndex((el) => el === active),
    )
    const next = (idx + dir + items.length) % items.length
    items[next]?.focus()
  }

  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, { method: 'DELETE', cache: 'no-store' })
    setOpen(false)
    router.push('/signin')
    router.refresh()
  }

  const handleMyPageClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    alert('서비스 준비중입니다') // TODO: 토스트 교체
    setOpen(false)
  }

  const itemBase =
    'flex h-12 w-full items-center justify-start gap-3 pl-4 pr-0 text-[16px] font-normal leading-6 text-[#101828] outline-none transition-colors'
  const itemDefault = 'hover:bg-gray-50 focus-visible:bg-gray-50'
  const iconClass = 'text-[#4A5565]'

  return (
    <div ref={rootRef} className="relative h-8 w-8">
      <button
        type="button"
        className="rounded-full"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="profile-menu"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <Avatar size="sm" />
      </button>

      {open && (
        <div
          id="profile-menu"
          ref={menuRef}
          role="menu"
          className={[
            'absolute right-0 mt-2',
            'flex flex-col items-start',
            'w-[160px] overflow-hidden',
            'rounded-[10px] border border-[#E5E7EB] bg-white',
            'p-px', // padding: 1px
            'shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]',
          ].join(' ')}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              focusMove(1)
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              focusMove(-1)
            }
            if (e.key === 'Escape') setOpen(false)
          }}
        >
          <Link
            href="/mypage"
            role="menuitem"
            tabIndex={0}
            data-menuitem
            className={[itemBase, itemDefault, 'hidden lg:flex'].join(' ')}
            onClick={handleMyPageClick}
          >
            <CircleUserRound size={16} className={iconClass} color="#4A5565" />
            마이페이지
          </Link>

          <button
            type="button"
            role="menuitem"
            tabIndex={0}
            data-menuitem
            className={[itemBase, itemDefault].join(' ')}
            onClick={handleLogout}
          >
            <LogOut size={16} className={iconClass} color="#4A5565" />
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}
