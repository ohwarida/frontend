import Link from 'next/link'

export function HeroBanner() {
  return (
    <section
      className={[
        'relative overflow-hidden rounded-[24px]',
        'w-full max-w-[1045px]',
        'min-h-[228px] sm:min-h-[260px] md:min-h-[272px]',
        'bg-[linear-gradient(135deg,#4F39F6_0%,#9810FA_50%,#F6339A_100%)]',
        'p-4 sm:p-6 md:p-8',
      ].join(' ')}
    >
      {/* blur 장식 */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 right-[-40px] h-[256px] w-[256px] rounded-full bg-white opacity-10 blur-[64px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-14 left-[-40px] h-[256px] w-[256px] rounded-full bg-[#FFDF20] opacity-20 blur-[64px]"
      />

      <div
        className={[
          'relative z-10',
          'flex flex-col justify-between gap-5',
          'md:flex-row md:items-end md:gap-10',
          'min-h-[calc(228px-32px)] sm:min-h-[calc(260px-48px)] md:min-h-[calc(272px-64px)]',
        ].join(' ')}
      >
        {/* 좌측 텍스트 */}
        <div className="flex flex-col gap-3 md:w-[420px] md:gap-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[14px]"
              aria-hidden
            >
              ✨
            </span>
            <span className="text-[12px] leading-4 font-bold tracking-[0.6px] text-[#EEF2FF] uppercase">
              원티드포텐업 스터디 모집
            </span>
          </div>

          <h1 className="m-0 text-[26px] leading-[34px] font-extrabold tracking-[-0.9px] text-white sm:text-[30px] sm:leading-[38px] md:text-[36px] md:leading-[45px]">
            함께 성장할 <br />
            <span className="bg-[linear-gradient(90deg,#FFFFFF_0%,#E0E7FF_100%)] bg-clip-text text-transparent">
              스터디 메이트
            </span>
            를 찾아보세요!
          </h1>

          <p className="m-0 text-[14px] leading-[22px] font-normal text-[rgba(224,231,255,0.9)] sm:text-[15px] sm:leading-[24px] md:text-[16px] md:leading-[26px]">
            혼자 하면 막막하지만 함께하면 즐겁습니다.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <span className="text-[14px] leading-[22px] font-normal text-[rgba(224,231,255,0.9)] sm:text-[15px] sm:leading-[24px] md:text-[16px] md:leading-[26px]">
              마감까지
            </span>

            <span className="box-border inline-flex h-7 items-center justify-center rounded-[4px] border border-white/20 bg-white/10 px-2 text-[14px] leading-[22px] font-bold text-white md:h-8 md:px-[9px] md:text-[16px] md:leading-[26px]">
              D-3
            </span>

            <span className="text-[14px] leading-[22px] font-normal text-[rgba(224,231,255,0.9)] sm:text-[15px] sm:leading-[24px] md:text-[16px] md:leading-[26px]">
              남았습니다.
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="md:flex md:items-end">
          <Link
            href="/study/create"
            className={[
              'w-full md:w-auto',
              'h-11 px-4 md:h-12',
              'inline-flex items-center justify-center gap-2',
              'rounded-[8px] bg-white',
              'shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]',
              'text-[16px] leading-6 font-bold text-[#4F39F6]',
              'active:translate-y-px',
            ].join(' ')}
          >
            <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden>
              ⊕
            </span>
            스터디 개설하기
          </Link>
        </div>
      </div>
    </section>
  )
}
