import { getUser } from '@/features/(authenticated)/users/apis/user.api'
import { AuthProvider } from '../_providers/AuthProvider'
import type { User } from '@/features/(authenticated)/users/types/User.type'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // TODO: 유저 정보 조회 API 정상 동작 후에는 catch 제거
  const initialUser = await getUser().catch(() => mockUser)

  return <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
}

const mockUser: User = {
  userId: 1,
  name: '테스트',
  email: 'mock@depth.com',
  trackId: 1,
  profileImageUrl: null,
  role: 'MEMBER',
}
