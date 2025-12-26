import { redirect } from 'next/navigation'

// TODO: 관리자 첫 진입 페이지 만들기 (관리자는 어떻게 분리를 할지.)
export default async function Page() {
  redirect('/admin/operator')
}
