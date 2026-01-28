import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 로컬 BE 프로필 이미지 서빙 경로
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/api/v1/users/profiles/**',
      },
      // 배포용 ngrok 이미지 서빙 경로
      {
        protocol: 'https',
        hostname: 'epencephalic-iris-unswaying.ngrok-free.dev',
        pathname: '/api/v1/images/profiles/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async headers() {
    const coop = {
      key: 'Cross-Origin-Opener-Policy',
      value: 'same-origin-allow-popups',
    }

    return [
      { source: '/signin/:path*', headers: [coop] },
      { source: '/signup/:path*', headers: [coop] },
    ]
  },
}

export default nextConfig
