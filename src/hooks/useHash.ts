import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useHash() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const read = () => setHash(window.location.hash ?? '')
    read()

    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [pathname, searchParams])

  return hash
}
