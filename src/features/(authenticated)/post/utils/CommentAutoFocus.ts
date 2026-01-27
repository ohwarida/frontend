'use client'

import { useEffect } from 'react'

function flash(el: HTMLElement) {
  el.classList.add('comment-flash')
  const t = window.setTimeout(() => el.classList.remove('comment-flash'), 1400)
  return () => window.clearTimeout(t)
}

export function CommentAutoFocus() {
  useEffect(() => {
    const hash = window.location.hash // #comment-123
    if (!hash) return

    const id = hash.slice(1) // comment-123
    const el = document.getElementById(id)
    if (!el) return

    // 헤더 높이 있으면 여기서 보정하고 싶을 수 있음
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const cleanup = flash(el)

    return cleanup
  }, [])

  return null
}
