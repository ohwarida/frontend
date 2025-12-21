import React from 'react'
import SocialButton from '@/features/(public)/signin/components/SocialButton'
import { MessageSquare, TrendingUp, Users } from 'lucide-react'

export default async function SignPage() {
  return (
    <div className="flex min-h-full items-start justify-center">
      <div className="my-auto flex min-h-full flex-col items-center justify-center gap-10">
        <div className="space-y-3 text-center">
          <h2 className="text-foreground/80 text-5xl">개발자들의 지식을</h2>
          <h2 className="bg-gradient-to-r from-blue-600 via-purple-500 to-violet-600 bg-clip-text text-5xl font-bold text-transparent">
            함께 나누는 공간
          </h2>
        </div>

        <p className="w-[240px] text-center text-xs">
          취업 팁부터 최신 트렌드까지, 개발자 커뮤니티에서 당신의 성장을 함께 만들어가세요
        </p>

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
          {' '}
          Google로 시작하기{' '}
        </SocialButton>

        <div className="flex items-center justify-center gap-8">
          <Card
            title="활발한 커뮤니티"
            message="전국의 개발자들과 실시간으로 소통하고 네트워킹하세요"
            icon={
              <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Users size={20} />
              </div>
            }
          />

          <Card
            title="실시간 Q&A"
            message="막히는 문제를 바로 질문하고 빠른 답변을 받아보세요"
            icon={
              <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <MessageSquare size={20} />
              </div>
            }
          />

          <Card
            title="최신 트렌드"
            message="개발 트렌드와 취업 정보를 가장 먼저 만나보세요"
            icon={
              <div className="flex size-10 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                <TrendingUp size={20} />
              </div>
            }
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
}: {
  title: string
  message: string
  icon: React.ReactNode
}) => {
  return (
    <div className="flex w-60 flex-col gap-4 rounded-xl bg-white p-6 text-xs shadow-2xl">
      <div className="flex size-10 items-center justify-center rounded-full bg-blue-200/60">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h4 className="text-sm">{title}</h4>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
