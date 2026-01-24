import { QueryClient } from '@tanstack/react-query'

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
    },
  },
}

export const nqc = () => new QueryClient(queryClientConfig)
