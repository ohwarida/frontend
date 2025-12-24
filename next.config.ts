import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    const coop = {
      key: 'Cross-Origin-Opener-Policy',
      value: 'same-origin-allow-popups',
    }

    return [
      {
        source: '/signin/:path*',
        headers: [coop],
      },
      {
        source: '/signup/:path*',
        headers: [coop],
      },
    ]
  },
}

export default nextConfig
