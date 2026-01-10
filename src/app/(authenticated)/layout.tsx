import { getUser } from '@/features/(authenticated)/users/apis/user.api'
import { AuthProvider } from '@/lib/providers/AuthProvider'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const initialUser = await getUser()

  return <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
}
