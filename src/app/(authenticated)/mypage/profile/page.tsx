import React from 'react'
import PageTitle from '@/components/ui/PageTitle'
import type { Metadata } from 'next'
import { getUser } from '@/features/(authenticated)/users/apis/user.api'
import { Avatar } from '@/components/ui/Avatar'
import MyPageProfileForm from '@/features/(authenticated)/mypage/components/MyPageProfileForm'
import ChangeMyProfileImage from '@/features/(authenticated)/mypage/components/ChangeMyProfileImage'

export const metadata: Metadata = {
  title: '프로필 설정 | 마이페이지 | Wanted Ground PotenUp',
  description: '내 프로필 정보를 확인하고 수정합니다.',
}

export default async function ProfilePage() {
  const initialUser = await getUser()

  return (
    <div>
      <PageTitle title="프로필 설정" subTitle="나의 프로필 정보를 확인하고 수정할 수 있습니다." />
      <section className="mt-5 max-w-xl">
        <span className="relative inline-block">
          <Avatar size="6xl" src={initialUser.profileImageUrl} alt="내 프로필" />
          <ChangeMyProfileImage />
        </span>

        <MyPageProfileForm
          name={initialUser.name}
          email={initialUser.email}
          track={String(initialUser.trackName)}
        />
      </section>
    </div>
  )
}
