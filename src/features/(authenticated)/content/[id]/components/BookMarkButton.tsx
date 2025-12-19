'use client'
import { Bookmark } from 'lucide-react'

export function BookMarkButton({ pressed = false }: { pressed?: boolean }) {
  return (
    <button
      type="button"
      aria-label="북마크"
      aria-pressed={pressed}
      className="h-7 w-7 rounded-md p-1 focus:ring-1 focus:ring-[#155DFC]/30 focus:outline-none"
    >
      <Bookmark size={20} stroke="rgba(55,56,60,0.61)" aria-hidden />
    </button>
  )
}
