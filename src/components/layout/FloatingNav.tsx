'use client'

import type { MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { House, PencilLine, User } from 'lucide-react'
import { TABS } from '@/features/(authenticated)/post/constants/tabs'

const HOME_PATHS = TABS.map((t) => t.href).filter(Boolean)

const items = [
  { href: '/', label: '홈', icon: House },
  { href: '/post/create', label: '글쓰기', icon: PencilLine },
  { href: '/mypage/post', label: '마이', icon: User, comingSoon: true },
] as const

export default function FloatingNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleMyPageClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/mypage/post')
  }

  const isHomeActive = pathname === '/' || HOME_PATHS.some((p) => pathname.startsWith(p))

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center lg:hidden">
      <nav
        className={clsx(
          'pointer-events-auto h-[60px] w-[300px] rounded-[75px]',
          'bg-white/70 backdrop-blur-md',
          'border-t border-gray-200/60 shadow-[1px_2px_3.4px_rgba(224,224,224,0.25)]',
          'flex items-center justify-between px-[42px]',
        )}
      >
        {items.map((it) => {
          const active = it.href === '/' ? isHomeActive : pathname.startsWith(it.href)
          const color = active ? 'text-[#155DFC]' : 'text-[#4A5565]'
          const Icon = it.icon

          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={'comingSoon' in it && it.comingSoon ? handleMyPageClick : undefined}
              aria-disabled={'comingSoon' in it && it.comingSoon ? true : undefined}
              className={clsx('flex flex-col items-center justify-center gap-1')}
            >
              <Icon className={clsx('size-4', color)} />
              <span className={clsx('text-[14px] leading-4 font-medium', color)}>{it.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
