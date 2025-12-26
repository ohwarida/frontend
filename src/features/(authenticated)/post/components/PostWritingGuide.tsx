const GUIDE_ITEMS = [
  '구체적이고 명확한 제목을 작성하세요',
  '적절한 카테고리를 선택해 주세요',
  '이미지는 jpg/png/webp 최대 5MB, gif 최대 3MB까지 업로드할 수 있어요',
  '마크다운으로 깔끔하게 작성하세요',
  '코드 블록은 ```언어명으로 시작하세요',
] as const

export default function PostWritingGuide() {
  return (
    <section className="w-full rounded-[10px] bg-white p-[24px]">
      <h3 className="text-[18px] leading-[27px] font-normal text-[#101828]">작성 가이드</h3>

      <ul className="mt-4 flex flex-col gap-3">
        {GUIDE_ITEMS.map((text) => (
          <li key={text} className="flex items-start gap-2">
            <span className="mt-px text-[16px] leading-[24px] text-[#155DFC]">•</span>
            <span className="text-[16px] leading-[24px] text-[#364153]">{text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-[10px] bg-[#EFF6FF] px-4 pt-4 pb-4">
        <p className="text-[15px] leading-[22px] font-normal text-[#193CB8]">
          좋은 게시글은 명확한 구조와 읽기 쉬운 문장으로 작성됩니다. 제목과 부제목을 활용해 내용을
          정리해 보세요.
        </p>
      </div>
    </section>
  )
}
