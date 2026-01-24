'use client'

import React, { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { nqc } from '@/lib/query-client/queryClient'

type Props = {
  children: React.ReactNode
}

export default function ReactQueryProvider({ children }: Props) {
  const [client] = useState(() => nqc())

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
