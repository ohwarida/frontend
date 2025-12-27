const GUIDE_ITEMS = [
  '구체적이고 명확한 제목을 작성하세요',
  '적절한 카테고리를 선택해 주세요',
  '이미지는 jpg/png/webp 최대 5MB, gif 최대 3MB까지 업로드할 수 있어요',
  '마크다운으로 깔끔하게 작성하세요',
  '코드 블록은 ```언어명으로 시작하세요',
] as const

export default function PostWritingGuide() {
  return (
    <section className="w-full rounded-[10px] bg-[#EFF6FF] p-4">
      <h3 className="text-[18px] leading-[27px] font-medium text-[#1C398E]">✍️ 작성 가이드</h3>

      <ul className="mt-2 flex flex-col gap-1">
        {GUIDE_ITEMS.map((text) => (
          <li key={text} className="flex items-start gap-2">
            <span className="text-[16px] leading-[24px] text-[#193CB8]">•</span>
            <span className="text-[16px] leading-[24px] text-[#193CB8]">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
