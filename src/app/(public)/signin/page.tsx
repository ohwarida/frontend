import React from 'react'
import SocialButton from '@/features/(public)/sign/components/SocialButton'

export default async function SignPage() {
  return (
    <div className="flex min-h-[calc(100dvh-80px)] items-start justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="space-y-3 text-center">
          <h2 className="text-foreground/80 text-5xl">개발자들의 지식을</h2>
          <h2 className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-5xl text-transparent">
            함께 나누는 공간
          </h2>
        </div>

        <p className="w-[335px] text-center">
          취업 팁부터 최신 트렌드까지, 개발자 커뮤니티에서 당신의 성장을 함께 만들어가세요
        </p>

        <SocialButton socialIcon="icon">Google로 시작하기</SocialButton>

        <div className="flex items-center justify-center gap-8">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

const Card = () => {
  return (
    <div className="flex w-72 flex-col gap-4 rounded-xl bg-white p-6 shadow-2xl">
      <div className="flex size-14 items-center justify-center rounded-full bg-blue-200/60">d</div>
      <h4 className="font-bold">활발한 커뮤니티</h4>
      <p>전국의 개발자들과 실시간으로 소통하고 네트워킹하세요</p>
    </div>
  )
}
