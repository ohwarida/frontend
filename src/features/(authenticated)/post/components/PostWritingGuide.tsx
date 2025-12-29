const GUIDE_ITEMS = [
  '구체적이고 명확한 제목을 작성하세요',
  '적절한 카테고리를 선택해 주세요',
  `이미지는 jpg/png/webp 최대 5MB, gif 최대 3MB까지 업로드할 수 있어요`,
  '마크다운으로 깔끔하게 작성하세요',
  '코드 블록은 ```언어명으로 시작하세요',
] as const

export default function PostWritingGuide() {
  return (
    <section className="w-full rounded-[10px] bg-[#EFF6FF] px-4 py-3 md:p-4">
      <h3 className="text-[14px] leading-[27px] font-medium text-[#1C398E] md:text-[18px]">
        ✍️ 작성 가이드
      </h3>

      <ul className="mt-2 flex w-[80%] flex-col gap-[2px] md:w-full md:gap-1">
        {GUIDE_ITEMS.map((text) => (
          <li key={text} className="flex w-full items-start gap-2">
            <span className="shrink-0 text-[12px] leading-[24px] text-[#193CB8] md:text-[16px]">
              •
            </span>
            <span className="min-w-0 text-[12px] leading-[24px] break-words whitespace-pre-line text-[#193CB8] md:text-[16px]">
              {text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
