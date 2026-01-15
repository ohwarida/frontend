import React from 'react'
import clsx from 'clsx'

export default async function CommentCard() {
  return (
    <div
      role="button"
      className={clsx(
        'block w-full border-b border-[rgba(0,0,0,0.06)] bg-white p-3',
        'md:box-border md:max-w-[1045px] md:overflow-hidden md:rounded-[8px] md:border-b-0 md:bg-white',
        'relative',
      )}
    >
      <article className="flex flex-col gap-1">
        <p className="font-medium">넥스트 제이에스 15 도입기</p>
        <p className="text-xs text-gray-500">2025.10.12</p>
      </article>
      <div className="absolute inset-y-0 right-4 flex items-center gap-3 text-xs">
        <p>조회 120</p>
        <p>좋아요 15</p>
      </div>
    </div>
  )
}
