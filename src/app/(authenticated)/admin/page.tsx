import { redirect } from 'next/navigation'

// 관리자는 1번 트랙
export default async function Page() {
  redirect('/admin/1')
}
