import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { ClipboardList, MessageCircle, Heart, UserCog, Trash2 } from 'lucide-react'
import AsideMyPageSelector from '@/components/layout/aside/AsideMyPageSelector'
import WithdrawMember from '@/features/(authenticated)/mypage/components/WithdrawMember'
import { Avatar } from '@/components/ui/Avatar'

export default async function AsideMyPage() {
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
            <Avatar />
            <div className="flex flex-col items-start text-xs">
              <p className="text-base font-bold text-gray-900">김 개발</p>
              <p className="text-gray-900">dev@example.com</p>
              <p className="text-gray-900">FE 트랙 1기</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <Link href="/mypage" className="w-full rounded-xl hover:bg-blue-100/20">
              <AsideMyPageSelector pathname="/mypage">
                <ClipboardList size={16} />
                <span> 내가 쓴 글</span>
              </AsideMyPageSelector>
            </Link>

            <Link href="/mypage/comment" className="w-full rounded-xl hover:bg-blue-100/20">
              <AsideMyPageSelector pathname="/mypage/comment">
                <MessageCircle size={16} />
                <span>내가 쓴 댓글</span>
              </AsideMyPageSelector>
            </Link>

            <Link href="/mypage/like" className="w-full rounded-xl hover:bg-blue-100/20">
              <AsideMyPageSelector pathname="/mypage/like">
                <Heart size={16} />
                <span>좋아요한 글</span>
              </AsideMyPageSelector>
            </Link>

            <Link href="/mypage/profile" className="w-full rounded-xl hover:bg-blue-100/20">
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
