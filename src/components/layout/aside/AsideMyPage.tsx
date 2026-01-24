import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { ClipboardList, MessageCircle, Heart, UserCog, Trash2 } from 'lucide-react'
import AsideMyPageSelector from '@/components/layout/aside/AsideMyPageSelector'
import WithdrawMember from '@/features/(authenticated)/mypage/components/WithdrawMember'
import { Avatar } from '@/components/ui/Avatar'
import { getUser } from '@/features/(authenticated)/users/apis/user.api'

export default async function AsideMyPage() {
  const initialUser = await getUser()

  return (
    <aside className="hidden lg:sticky lg:top-[89px] lg:block lg:h-full lg:min-w-72">
      <div className="space-y-5">
        <section
          className={clsx(
            'w-full rounded-[10px] border border-[#E5E7EB] bg-white',
            'px-[17px] py-[17px]',
          )}
        >
          <div className="mb-4 flex w-full items-center justify-start gap-4 border-b border-[#E5E7EB] pb-4">
            <Avatar size="lg" src={initialUser.profileImageUrl} alt="내 프로필" />
            <div className="flex flex-col items-start text-xs">
              <p className="text-base font-bold text-gray-900">{initialUser.name}</p>
              <p className="mb-[1px] text-gray-900">{initialUser.email}</p>
              <p className="text-gray-900">{initialUser.trackName}</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <Link href="/mypage" className="w-full">
              <AsideMyPageSelector pathname="/mypage">
                <ClipboardList size={16} />
                <span> 내가 쓴 글</span>
              </AsideMyPageSelector>
            </Link>

            <Link href="/mypage/comment" className="w-full">
              <AsideMyPageSelector pathname="/mypage/comment">
                <MessageCircle size={16} />
                <span>내가 쓴 댓글</span>
              </AsideMyPageSelector>
            </Link>

            <Link href="/mypage/like" className="w-full">
              <AsideMyPageSelector pathname="/mypage/like">
                <Heart size={16} />
                <span>내가 좋아요 한 글</span>
              </AsideMyPageSelector>
            </Link>

            <Link href="/mypage/profile" className="w-full">
              <AsideMyPageSelector pathname="/mypage/profile">
                <UserCog size={16} />
                <span>프로필 설정</span>
              </AsideMyPageSelector>
            </Link>

            <WithdrawMember>
              <AsideMyPageSelector pathname="">
                <Trash2 size={16} />
                <span>회원 탈퇴</span>
              </AsideMyPageSelector>
            </WithdrawMember>
          </div>
        </section>
      </div>
    </aside>
  )
}
