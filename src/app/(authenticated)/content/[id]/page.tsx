import React from 'react'
import BookMarkButton from '@/features/(authenticated)/content/[id]/components/BookMarkButton'
import Reaction from '@/features/(authenticated)/content/[id]/components/Reaction'
import Replies from '@/features/(authenticated)/content/[id]/components/Replies'

export default async function ContentDetailPage() {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="flex h-7 items-center gap-2 rounded-full bg-yellow-50 px-3 text-[11px] font-medium text-gray-800">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs">
                🧑‍💻
              </span>
              {/* 작성자 명 */}
              {}
            </span>
            <span className="text-gray-400">·</span>
            <span>2시간 전</span>
            <span className="text-gray-400">·</span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
              {/* 취업 */}
              {}
            </span>
          </div>
        </div>
        <BookMarkButton />
      </div>

      <h1 className="mb-3 text-2xl font-bold text-gray-900">
        {/* 타이틀 */}
        {}
      </h1>

      {/* 해시태그 */}
      <div className="mb-6 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">
          #취업
        </span>
        <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">
          #포트폴리오
        </span>
        <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">
          #주니어
        </span>
      </div>

      {/* 본문 */}
      <article className="mb-8 space-y-5 text-sm leading-relaxed text-gray-800"></article>

      {/* 반응 영역 */}
      <Reaction />

      {/* 댓글 영역 */}
      <Replies />
    </section>
  )
}
