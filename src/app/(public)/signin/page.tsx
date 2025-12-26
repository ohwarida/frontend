import React from 'react'
import SocialButton from '@/features/(public)/signin/components/SocialButton'
import { MessageSquare, TrendingUp, Users } from 'lucide-react'

export default async function SignPage() {
  return (
    <div className="flex h-full w-full items-start justify-center px-5 py-10 md:items-center md:py-16">
      <div className="flex w-full max-w-[374px] flex-col items-center gap-10 md:max-w-5xl">
        <div className="space-y-3 text-center">
          <h2 className="text-foreground/80 text-[36px] leading-[45px] font-normal md:text-5xl md:leading-tight">
            개발자들의 지식을
          </h2>
          <h2 className="bg-gradient-to-r from-blue-600 via-purple-500 to-violet-600 bg-clip-text text-[36px] leading-[45px] font-bold text-transparent md:text-5xl md:leading-tight">
            함께 나누는 공간
          </h2>
        </div>

        <p className="max-w-[326px] text-center text-[18px] leading-7 text-slate-600 md:max-w-xl md:text-base md:leading-6">
          취업 팁부터 최신 트렌드까지, 개발자 커뮤니티에서 당신의 성장을 함께 만들어가세요
        </p>

        <div className="w-full max-w-[280px]">
          <SocialButton
            socialIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
                style={{ display: 'block' }}
                aria-hidden
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            }
          >
            Google 로그인
          </SocialButton>
        </div>

        <div className="grid w-full max-w-[326px] grid-cols-1 gap-4 md:max-w-5xl md:grid-cols-3 md:gap-6">
          <Card
            title="활발한 커뮤니티"
            message="전국의 개발자들과 실시간으로 소통하고 네트워킹하세요"
            icon={<Users size={20} />}
            iconBgClass="bg-blue-100"
            iconTextClass="text-blue-600"
          />
          <Card
            title="실시간 Q&A"
            message="막히는 문제를 바로 질문하고 빠른 답변을 받아보세요"
            icon={<MessageSquare size={20} />}
            iconBgClass="bg-purple-100"
            iconTextClass="text-purple-600"
          />
          <Card
            title="최신 트렌드"
            message="개발 트렌드와 취업 정보를 가장 먼저 만나보세요"
            icon={<TrendingUp size={20} />}
            iconBgClass="bg-pink-100"
            iconTextClass="text-pink-600"
          />
        </div>
      </div>
    </div>
  )
}

const Card = ({
  title,
  message,
  icon,
  iconBgClass,
  iconTextClass,
}: {
  title: string
  message: string
  icon: React.ReactNode
  iconBgClass: string
  iconTextClass: string
}) => {
  return (
    <div className="w-full rounded-2xl border border-white/50 bg-white/60 p-6 text-xs shadow-2xl backdrop-blur">
      <div
        className={`flex size-10 items-center justify-center rounded-full ${iconBgClass} ${iconTextClass}`}
      >
        {icon}
      </div>
      <div className="mt-4 space-y-1.5">
        <h4 className="text-[18px] leading-7 font-normal text-slate-900 md:text-base md:leading-6">
          {title}
        </h4>
        <p className="text-[14px] leading-5 text-slate-600 md:text-sm">{message}</p>
      </div>
    </div>
  )
}
