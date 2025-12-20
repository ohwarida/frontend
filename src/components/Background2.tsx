'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

// TODO: Unicorn Studio 배경 컴포넌트 최적화 하기
export default function Background2() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.UnicornStudio?.isInitialized) {
      setReady(true)
      return
    }

    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false }

      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js'

      script.onload = () => {
        // 🔑 DOM이 이미 있으므로 이제 init
        window.UnicornStudio?.init?.()
        window.UnicornStudio!.isInitialized = true
        setReady(true)
      }

      document.head.appendChild(script)
    }
  }, [])

  return (
    <div
      className={clsx(
        `absolute inset-0 transition-opacity duration-500`,
        ready ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div data-us-project="1nCWzmjSoyYtyrWcBsMi" className="absolute inset-0" />
    </div>
  )
}
