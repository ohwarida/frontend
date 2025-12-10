'use client'

import React from 'react'

export default function Replies() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-900">댓글 4</h2>

      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4">
        <textarea
          className="h-24 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-inner placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="댓글을 입력해주세요."
        />
        <div className="mt-3 flex justify-end">
          <button className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
            <span>댓글 작성</span>
          </button>
        </div>
      </div>
      <div className="space-y-6">
        {/* 단일 댓글 */}
        <div className="flex gap-3">
          {/* 프로필 */}
          <div className="mt-1 h-8 w-8 shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src="https://avatars.githubusercontent.com/u/1?v=4"
              alt="profile"
            />
          </div>

          {/* 내용 */}
          <div className="w-full">
            {/* 작성자 + 시간 */}
            <div className="mb-1 flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-900">이개발</span>
              <span className="text-xs text-gray-400">· 2시간 전</span>
            </div>

            {/* 본문 */}
            <p className="text-sm text-gray-800">
              정말 유용한 정보 감사합니다! 특히 README 작성 부분이 도움이 많이 되었어요.
            </p>

            {/* 좋아요 / 답글 */}
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                ❤️ <span>12</span>
              </button>
              <button className="hover:text-gray-700">답글</button>
            </div>

            {/* ▼ 대댓글 */}
            <div className="mt-4 ml-10 space-y-4 border-l border-gray-200 pl-4">
              {/* 대댓글 1 */}
              <div className="flex gap-3">
                <img
                  className="h-7 w-7 rounded-full"
                  src="https://avatars.githubusercontent.com/u/2?v=4"
                  alt=""
                />
                <div>
                  <div className="mb-1 flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-900">박형순</span>
                    <span className="text-xs text-gray-400">· 방금 전</span>
                  </div>
                  <p className="text-sm text-gray-800">
                    도움이 되었다니 다행입니다! 궁금한 점이 있다면 언제든 물어주세요 :)
                  </p>
                </div>
              </div>

              {/* 대댓글 2 */}
              <div className="flex gap-3">
                <img
                  className="h-7 w-7 rounded-full"
                  src="https://avatars.githubusercontent.com/u/3?v=4"
                  alt=""
                />
                <div>
                  <div className="mb-1 flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-900">김기순</span>
                    <span className="text-xs text-gray-400">· 방금 전</span>
                  </div>
                  <p className="text-sm text-gray-800">도움이 되었다니 다행입니다!</p>
                </div>
              </div>
            </div>

            {/* ▼ 대댓글 입력창 */}
            <div className="mt-4 ml-10">
              <textarea
                placeholder="답글을 입력하세요..."
                className="h-20 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
              />

              <div className="mt-2 flex justify-end gap-2 text-sm">
                <button className="rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100">
                  취소
                </button>
                <button className="rounded-lg bg-blue-600 px-4 py-1.5 font-medium text-white hover:bg-blue-700">
                  답글 작성
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
