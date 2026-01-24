'use client'

import React, { useRef, useState } from 'react'
import { Camera } from 'lucide-react'
import { changeProfileAction } from '@/features/(authenticated)/mypage/actions/changeProfile.action'

export default function ChangeMyProfileImage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [failUpload, setFailUpload] = useState<string | undefined>()

  const openFilePicker = () => {
    inputRef.current?.click()
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const res = await changeProfileAction(file)

    if (res) {
      setFailUpload(res.message)
    }
    e.target.value = ''
  }

  return (
    <>
      {/* 안 보이는 파일 인풋 */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {/* 보여지는 버튼 */}
      <button
        type="button"
        onClick={openFilePicker}
        className="absolute right-0 bottom-0 flex size-10 items-center justify-center rounded-full bg-blue-500 p-1 text-white hover:opacity-80"
        aria-label="프로필 이미지 변경"
      >
        <Camera size={26} />
      </button>
    </>
  )
}
