'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

const SCRIPT_ID = 'unicorn-studio-script'
const SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js'

//TODO logout시 UnicornStudio reset 기능 필요
export default function Background2() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fadeIn = () => {
      requestAnimationFrame(() => {
        if (!cancelled) setVisible(true)
      })
    }

    const initAndShow = () => {
      try {
        window.UnicornStudio?.init?.()
        if (window.UnicornStudio) window.UnicornStudio.isInitialized = true
      } finally {
        fadeIn()
      }
    }

    if (window.UnicornStudio?.isInitialized) {
      initAndShow()
      return () => {
        cancelled = true
      }
    }

    window.UnicornStudio = window.UnicornStudio ?? { isInitialized: false }

    // 스크립트 중복 삽입 방지
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      // 이미 로드된 스크립트면 바로 init
      if (existing.dataset.loaded === 'true') {
        initAndShow()
      } else {
        existing.addEventListener(
          'load',
          () => {
            existing.dataset.loaded = 'true'
            initAndShow()
          },
          { once: true },
        )
      }

      return () => {
        cancelled = true
      }
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true

    script.onload = () => {
      script.dataset.loaded = 'true'
      initAndShow()
    }

    document.head.appendChild(script)

    return () => {
      cancelled = true
    }
  })

  return (
    <div
      className={clsx(
        'will-change-opacity absolute inset-0 transition-opacity duration-2000',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div data-us-project="1nCWzmjSoyYtyrWcBsMi" className="absolute inset-0" />
    </div>
  )
}
