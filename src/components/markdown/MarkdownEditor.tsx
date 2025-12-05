'use client'

import React, { useRef, useState } from 'react'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type MarkdownEditorProps = {
  name: string
  defaultValue?: string
}

async function uploadImageAndGetUrl(file: File): Promise<string> {
  // TODO: 실제에선 supabase/storage 업로드 로직으로 교체
  return Promise.resolve(URL.createObjectURL(file))
}

const MarkdownEditor = ({ name, defaultValue = '' }: MarkdownEditorProps) => {
  const [value, setValue] = useState(defaultValue)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = async (file: File) => {
    const url = await uploadImageAndGetUrl(file)
    setValue((prev) => `${prev}\n\n![이미지 설명](${url})\n\n`)
  }

  return (
    <article data-color-mode="dark">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            void handleUpload(file)
          }
          e.target.value = ''
        }}
      />

      <MDEditor
        preview="edit"
        height="100%"
        value={value}
        onChange={(val) => setValue(val ?? '')}
        textareaProps={{ name }}
        commandsFilter={(cmd) => {
          if (cmd.name === 'image') {
            return {
              ...cmd,
              execute: () => {
                fileInputRef.current?.click()
              },
            }
          }
          return cmd
        }}
      />
    </article>
  )
}

export default MarkdownEditor
