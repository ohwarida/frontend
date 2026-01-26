import React from 'react'
import PageTitle from '@/components/ui/PageTitle'
import type { Metadata } from 'next'
import { getUser } from '@/features/(authenticated)/users/apis/user.api'
import { Avatar } from '@/components/ui/Avatar'
import { MyPageProfileForm } from '@/features/(authenticated)/mypage/components/MyPageProfileForm'
import { ChangeMyProfileImage } from '@/features/(authenticated)/mypage/components/ChangeMyProfileImage'
import { Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '프로필 설정 | 마이페이지 | Wanted Ground PotenUp',
  description: '내 프로필 정보를 확인하고 수정합니다.',
}

export default async function MyProfilePage() {
  const initialUser = await getUser()

  return (
    <div className="bg-white lg:bg-[#F9FAFB]">
      <div className="hidden lg:block">
        <PageTitle title="프로필 설정" subTitle="나의 프로필 정보를 확인하고 수정할 수 있습니다." />

        <div className="mt-8 flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex justify-start">
              <span className="relative inline-block h-32 w-32">
                <Avatar
                  size="6xl"
                  src={initialUser.profileImageUrl}
                  alt="내 프로필"
                  className="h-32 w-32 border-4 border-white bg-[#F3F4F6]"
                />
                <div className="absolute right-0 bottom-0">
                  <ChangeMyProfileImage />
                </div>
              </span>
            </div>

            <div className="w-[573px]">
              <MyPageProfileForm
                name={initialUser.name}
                email={initialUser.email}
                track={String(initialUser.trackName)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[calc(100dvh-60px)] pt-(--header-h) lg:hidden">
        <section className="mx-auto px-4">
          <div className="flex justify-center">
            <span className="relative inline-block">
              <Avatar
                size="6xl"
                src={initialUser.profileImageUrl}
                alt="내 프로필"
                className="h-32 w-32 border-[3.7px] border-[#F9FAFB] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
              />
              <div className="absolute right-0 bottom-0 translate-x-[6px] translate-y-[6px]">
                <ChangeMyProfileImage />
              </div>
            </span>
          </div>

          <div className="mt-6">
            <MyPageProfileForm
              name={initialUser.name}
              email={initialUser.email}
              track={String(initialUser.trackName)}
            />
          </div>

          <div className="mt-6">
            <button
              type="button"
              className={[
                'flex h-10 w-full items-center gap-2 rounded-[10px] pl-3',
                'text-[14px] leading-6 text-[#AEB0B6]',
                'focus:ring-2 focus:ring-[#AEB0B6]/20 focus:outline-none',
              ].join(' ')}
            >
              <Trash2 size={16} className="shrink-0 text-[#AEB0B6]" />
              <span className="relative top-[-0.5px]">회원 탈퇴</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
