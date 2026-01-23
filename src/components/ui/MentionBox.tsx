'use client'

import React from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { User } from '@/features/(authenticated)/users/types/User.type'

export function MentionBox({ members }: { members: User[] }) {
  if (members?.length === 0) return null
  return (
    <div
      id="Mention"
      className="absolute -top-50 left-0 z-50 h-48 w-70 rounded-lg border border-gray-300"
    >
      <p className="flex h-8 w-full items-center rounded-tl-lg rounded-tr-lg border-b border-gray-300 bg-gray-100 px-2.5 text-xs text-gray-700">
        맴버 멘션하기
      </p>
      <div className="h-[calc(100%-2rem)] overflow-y-auto rounded-br-lg rounded-bl-lg bg-white px-2.5">
        <div className="flex items-center gap-2 py-2">
          <Avatar size="xs" alt="유저 프로필 사진" />
          <span>이름</span>
          <span className="text-[10px] text-gray-400">@u1</span>
        </div>
        {members.map((m) => (
          <button
            key={m.userId}
            type="button"
            className="flex w-full items-center gap-2 rounded-md py-2 text-left hover:bg-gray-50"
            // onClick={() => onSelect(m)}  // 선택 로직 붙일 자리
          >
            <Avatar size="xs" alt={`${m.name} 프로필`} src={m.profileImageUrl} />
            <span className="text-sm text-gray-800">{m.name}</span>
            <span className="text-[10px] text-gray-400">@{m.userId}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
