'use client'

const BORDER = 'border border-[rgba(112,115,124,0.22)]'

export function Reaction() {
  return (
    <section aria-label="리액션" className="flex items-center gap-3">
      <ul className="flex items-center gap-3">
        <li>
          <button
            className={`inline-flex h-[38px] items-center gap-1.5 rounded-[10px] bg-white px-3 ${BORDER}`}
          >
            <span role="img" aria-label="하트">
              ❤️
            </span>
            <span className="text-[14px] leading-[20px] text-[rgba(46,47,51,0.88)]">5</span>
          </button>
        </li>
        <li>
          <button
            className={`inline-flex h-[38px] items-center gap-1.5 rounded-[10px] bg-white px-3 ${BORDER}`}
          >
            <span role="img" aria-label="불">
              🔥
            </span>
            <span className="text-[14px] leading-[20px] text-[rgba(46,47,51,0.88)]">3</span>
          </button>
        </li>
        <li>
          <button
            aria-label="리액션 추가"
            className={`inline-flex h-8 w-11 items-center justify-center rounded-lg bg-white ${BORDER}`}
          >
            <span role="img" aria-hidden className="text-[18px] leading-[28px] font-medium">
              😊
            </span>
          </button>
        </li>
      </ul>

      <p className="text-[14px] leading-[20px] text-[rgba(55,56,60,0.61)]">8 reactions</p>
    </section>
  )
}
