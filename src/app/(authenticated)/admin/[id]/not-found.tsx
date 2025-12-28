import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">존재하지 않는 페이지입니다</h2>
      <p className="mt-2 text-sm text-gray-600">요청한 ID를 찾을 수 없습니다.</p>
      <Link className="mt-4 inline-block underline" href="/admin/track">
        목록으로
      </Link>
    </div>
  )
}
