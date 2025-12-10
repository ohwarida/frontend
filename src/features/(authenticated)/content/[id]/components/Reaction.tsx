'use client'
import React from 'react'

export default function Reaction() {
  return (
    <div className="mb-10 flex items-center gap-2">
      <button className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-500">
        <span>❤️</span>
        <span>5</span>
      </button>
      <button className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-500">
        <span>👍</span>
        <span>3</span>
      </button>
      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
        8 reactions
      </span>
    </div>
  )
}
