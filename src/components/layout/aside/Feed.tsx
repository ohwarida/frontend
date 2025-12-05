'use client'

import React from 'react';
import clsx from "clsx";
import Link from "next/link";

const FEED_ITEMS = [
  {id: 'popular', label: '인기 게시글', icon: '🔥', active: true},
  {id: 'latest', label: '최신 게시글', icon: '⏰'},
  {id: 'following', label: '팔로잉', icon: '👥'},
  {id: 'saved', label: '저장한 글', icon: '📌'},
]

export default function Feed() {
  return (
    <div className="flex flex-col gap-1.5">
      {FEED_ITEMS.map((item) => {
        const isActive = item.active

        return (
          <Link
            href=''
            key={item.id}
            type="button"
            className={clsx(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50',
            )}
          >
                  <span
                    className={clsx(
                      'flex size-6 items-center justify-center rounded-full',
                      isActive
                        ? 'bg-blue-50 text-blue-500'
                        : 'bg-white text-gray-400',
                    )}
                  >
                    {item.icon}
                  </span>

            <span className="leading-none">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
