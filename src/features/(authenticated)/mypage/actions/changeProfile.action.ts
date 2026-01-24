'use server'

import { revalidateTag, revalidatePath } from 'next/cache'
import { changeProfile } from '@/features/(authenticated)/mypage/apis/changeProfile'

export async function changeProfileAction(file: File): Promise<{ message: string } | undefined> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    await changeProfile(formData)

    revalidateTag('my-profile', 'max')
    revalidatePath('/mypage')
    revalidatePath('/mypage/profile')

    return undefined
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '서버 요청 실패'
    return { message }
  }
}
