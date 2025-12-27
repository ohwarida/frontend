'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import '@uiw/react-md-editor/markdown-editor.css'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { uploadImage } from '@/features/(authenticated)/post/apis/image.api'
import {
  ALLOWED_MIME_TYPES,
  MAX_GIF_BYTES,
  MAX_IMAGE_BYTES,
} from '@/features/(authenticated)/post/constants/image'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type MarkdownEditorProps = {
  name: string
  draftId: string
  defaultValue?: string
  onChange?: (value: string) => void
}

function formatImageUrl(res: { url: string; relativePath: string }) {
  const url = res.url?.trim()
  return `${url}`
}

function formatBytes(bytes: number) {
  const mb = bytes / 1024 / 1024
  return `${mb.toFixed(mb >= 10 ? 0 : 1)}MB`
}

function validateImageFile(file: File) {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return `지원하지 않는 파일 형식이에요. (허용: jpg, png, gif, webp)`
  }

  const isGif = file.type === 'image/gif'
  const limit = isGif ? MAX_GIF_BYTES : MAX_IMAGE_BYTES

  if (file.size > limit) {
    return `${isGif ? 'GIF' : '이미지'} 용량이 너무 커요. 최대 ${formatBytes(limit)}까지 업로드할 수 있어요. (현재: ${formatBytes(
      file.size,
    )})`
  }

  return null
}

export default function MarkdownEditor({
  name,
  draftId,
  defaultValue = '',
  onChange,
}: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue)
  const valueRef = useRef(value)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [focused, setFocused] = useState(false)
  const [uploading, setUploading] = useState(false)

  const accept = useMemo(() => 'image/jpeg,image/png,image/gif,image/webp', [])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    valueRef.current = value
  }, [value])

  const syncValue = (next: string) => {
    setValue(next)
    onChange?.(next)
  }

  const handleUpload = async (file: File) => {
    if (!draftId) {
      alert('draftId가 없어 이미지 업로드를 할 수 없습니다.')
      return
    }

    const msg = validateImageFile(file)
    if (msg) {
      alert(msg)
      return
    }

    setUploading(true)
    try {
      const res = await uploadImage({ file, draftId })
      if (!res) throw new Error('이미지 업로드 응답이 비어있습니다.')

      const imageUrl = formatImageUrl(res)
      const next = `${valueRef.current}\n\n![이미지 설명](${imageUrl})\n\n`
      syncValue(next)
    } catch (e) {
      alert(e instanceof Error ? e.message : '이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
    }
  }

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
        accept={accept}
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
            'ring-0 outline-none',
            '!h-full !border-0 !bg-transparent !shadow-none',
            '[&_.w-md-editor-toolbar]:!bg-transparent',
            '[&_.w-md-editor-toolbar]:!border-0',
            '[&_.w-md-editor-toolbar]:!shadow-none',
            '[&_.w-md-editor-toolbar]:!pt-2.5',
            '[&_.w-md-editor-toolbar]:!px-3',
            '[&_.w-md-editor-toolbar]:!pb-2',
            '[&_.w-md-editor-content]:!bg-[#F4F4F5]',
            '[&_.w-md-editor-content]:!rounded-md',
            '[&_.w-md-editor-content]:!border-0',
            '[&_.w-md-editor-content]:!shadow-none',
            '[&_.w-md-editor-content]:!min-h-[240px]',
            '[&_.w-md-editor-area]:!min-h-full',
            '[&_.w-md-editor-input]:!min-h-full',
            '[&_.w-md-editor-text]:!h-full',
            '[&_.w-md-editor-text-input]:!h-full',
            '[&_.w-md-editor-text-input]:!resize-none',
            uploading && 'pointer-events-none opacity-70',
          )}
          commandsFilter={(cmd) => {
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
