'use client'

import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false })

/**
 * 저장된 Markdown 문자열을 렌더링하는 뷰어 컴포넌트.
 *
 * - `@uiw/react-markdown-preview`를 사용해서 HTML로 렌더링
 * - 다크 모드에서는 `data-color-mode="dark"` + `prose` 클래스로 보기 좋게 표시
 *
 * 사용 예시:
 *
 * ```tsx
 * // 강의 상세 페이지 같은 곳에서
 * const lecture = await getLecture(params.id)
 *
 * return (
 *   <MarkdownViewer content={lecture.description} />
 * )
 * ```
 */
const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <article data-color-mode="light" className="prose max-w-none">
      <MarkdownPreview source={content} className="mt-0 rounded-md" />
    </article>
  )
}

export default MarkdownViewer
