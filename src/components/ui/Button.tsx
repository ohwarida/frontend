import React from 'react'

//todo 버튼 컴포넌트 디자인 하기 (variants, size, )
export default async function Button({ children }: { children: React.ReactNode }) {
  return <button className="border px-3 py-1">{children}</button>
}
