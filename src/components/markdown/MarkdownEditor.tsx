'use client'

import React, { useEffect, useRef, useState } from 'react'
import '@uiw/react-md-editor/markdown-editor.css'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type MarkdownEditorProps = {
  name: string
  defaultValue?: string
  onChange?: (value: string) => void
}

async function uploadImageAndGetUrl(file: File): Promise<string> {
  // TODO: 실제 업로드 로직으로 교체
  return Promise.resolve(URL.createObjectURL(file))
}

const MarkdownEditor = ({ name, defaultValue = '', onChange }: MarkdownEditorProps) => {
  const [value, setValue] = useState(defaultValue)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [focused, setFocused] = useState(false) // ★ 에디터 포커스 상태

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const syncValue = (next: string) => {
    setValue(next)
    onChange?.(next)
  }

  const handleUpload = async (file: File) => {
    const url = await uploadImageAndGetUrl(file)
    syncValue(`${value}\n\n![이미지 설명](${url})\n\n`)
  }

  // 플레이스홀더로 보여줄 기본 텍스트
  const placeholder = [
    '내용을 입력하세요',
    '',
    '마크다운을 지원합니다.',
    '## 제목 2',
    '### 제목 3',
    '**강조**',
    '[링크](url)',
    '`code`',
    '',
    '```javascript',
    '// 코드 블록',
    "const hello = 'world';",
    '```',
  ].join('\n')

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void handleUpload(file)
          e.target.value = ''
        }}
      />

      <div data-color-mode="light" className="h-full w-full rounded">
        <MDEditor
          preview="edit"
          height={320}
          visibleDragbar={false}
          value={value}
          onChange={(val) => syncValue(val ?? '')}
          textareaProps={{
            name,
            placeholder,
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
          }}
          className={clsx(
            focused
              ? 'ring-blue-500/10 ring-offset-1 [&_.w-md-editor-content]:!ring-2 [&_.w-md-editor-content]:!ring-offset-gray-100/50'
              : 'ring-1 ring-transparent',
            '!h-full !border-0 !shadow-none',
            '[&_.w-md-editor-content]:!bg-gray-200/40 [&_.w-md-editor-toolbar]:!border-0',
            '[&_.w-md-editor-content]:!rounded-md',
            '[&_.w-md-editor-content]:!mt-2.5',
            '[&_.w-md-editor-content]:!min-h-calc(100%-112px)',
            '[&_.w-md-editor-toolbar]:!bg-white',
            '[&_.w-md-editor-toolbar]:!rounded-tl-md',
            '[&_.w-md-editor-toolbar]:!rounded-tr-md',
            '[&_.w-md-editor-toolbar]:!py-2.5',
            '[&_.w-md-editor-toolbar]:!mb-2.5',
            '[&_.w-md-editor-text-input]:!h-full',
            '[&_.w-md-editor-toolbar]:!border-b-2',

            '[&_.w-md-editor-area]:!min-h-full',
            '[&_.w-md-editor-input]:!min-h-full',

            // ★ textarea 높이 100% + 리사이즈 막기
            '[&_.w-md-editor-text-input]:!h-full',
            '[&_.w-md-editor-text]:!h-full',
            '[&_.w-md-editor-text-input]:!resize-none',
          )}
          commandsFilter={(cmd) => {
            // 툴바에 남길 명령만 선택 (Bold, Italic, Quote, Code, Image, Link)
            const allowed = ['bold', 'italic', 'quote', 'code', 'image', 'link']
            if (!cmd.name) return false
            if (!allowed.includes(cmd.name)) return false

            if (cmd.name === 'image') {
              return {
                ...cmd,
                execute: () => fileInputRef.current?.click(),
              }
            }

            return cmd
          }}
        />
      </div>
    </>
  )
}

export default MarkdownEditor
