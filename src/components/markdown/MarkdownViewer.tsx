'use client'

import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false })

// TODO: !important 제거
// TODO: next/image 적용할 수 있으면 적용
const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <article
      data-color-mode="light"
      className="max-w-none text-[16px] leading-[28px] text-black [&_.wmde-markdown]:bg-transparent [&_.wmde-markdown]:shadow-none [&_.wmde-markdown_h1]:[padding-bottom:0!important] [&_.wmde-markdown_h1]:[border-bottom:none!important] [&_.wmde-markdown_h2]:[padding-bottom:0!important] [&_.wmde-markdown_h2]:[border-bottom:none!important]"
    >
      <MarkdownPreview
        source={content}
        className="mt-0 rounded-md [&_img]:w-full [&_li]:my-0 [&_li]:marker:text-[rgba(46,47,51,0.88)] [&_ol]:my-0 [&_ol]:list-outside [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:marker:text-[rgba(46,47,51,0.88)] [&_p]:my-0 [&_p+_p]:mt-5 [&_ul]:my-0 [&_ul]:list-outside [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-[rgba(46,47,51,0.88)]"
      />
    </article>
  )
}

export default MarkdownViewer
