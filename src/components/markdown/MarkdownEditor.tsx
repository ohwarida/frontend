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

const MAX_CONTENT_LENGTH = 5000

type MarkdownEditorProps = {
  name: string
  draftId: string
  defaultValue?: string
  onChange?: (value: string) => void
}

function formatImageUrl(res: { url: string; relativePath: string }) {
  return res.url?.trim() ?? ''
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

function clampToMax(value: string) {
  return value.length <= MAX_CONTENT_LENGTH ? value : value.slice(0, MAX_CONTENT_LENGTH)
}

function insertAtSelection(params: {
  value: string
  insert: string
  selectionStart: number
  selectionEnd: number
}) {
  const { value, insert, selectionStart, selectionEnd } = params
  const before = value.slice(0, selectionStart)
  const after = value.slice(selectionEnd)
  const next = before + insert + after
  const cursor = selectionStart + insert.length
  return { next, cursor }
}

export default function MarkdownEditor({
  name,
  draftId,
  defaultValue = '',
  onChange,
}: MarkdownEditorProps) {
  const [value, setValue] = useState(() => clampToMax(defaultValue))
  const valueRef = useRef(value)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const editorWrapRef = useRef<HTMLDivElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const selectionRef = useRef<{ start: number; end: number } | null>(null)
  const shouldRestoreSelectionRef = useRef(false)

  const accept = useMemo(() => 'image/jpeg,image/png,image/gif,image/webp', [])

  useEffect(() => {
    const next = clampToMax(defaultValue)
    setValue(next)
    onChange?.(next)
  }, [defaultValue])

  useEffect(() => {
    valueRef.current = value
  }, [value])

  const getTextarea = () => {
    const root = editorWrapRef.current
    if (!root) return null
    return root.querySelector('textarea') as HTMLTextAreaElement | null
  }

  const saveSelection = () => {
    const ta = getTextarea()
    const current = valueRef.current
    if (!ta) {
      selectionRef.current = { start: current.length, end: current.length }
      return
    }
    selectionRef.current = { start: ta.selectionStart ?? 0, end: ta.selectionEnd ?? 0 }
  }

  const restoreSelection = (cursor: number) => {
    const run = () => {
      const ta = getTextarea()
      if (!ta) return
      ta.focus()
      const c = Math.min(cursor, ta.value.length)
      ta.setSelectionRange(c, c)
    }
    requestAnimationFrame(() => {
      run()
      setTimeout(run, 0)
    })
  }

  const syncValue = (nextRaw: string) => {
    const next =
      nextRaw.length > MAX_CONTENT_LENGTH ? nextRaw.slice(0, MAX_CONTENT_LENGTH) : nextRaw
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
      const insert = `![](${imageUrl})`

      const current = valueRef.current
      const saved = selectionRef.current
      const selectionStart = saved?.start ?? current.length
      const selectionEnd = saved?.end ?? current.length

      const needsPrefixNewline =
        selectionStart > 0 && current.slice(selectionStart - 1, selectionStart) !== '\n'
      const chunk = `${needsPrefixNewline ? '\n' : ''}${insert}\n`
      const nextLen = current.length - (selectionEnd - selectionStart) + chunk.length
      if (nextLen > MAX_CONTENT_LENGTH) {
        alert(`이미지를 삽입하려면 내용이 ${MAX_CONTENT_LENGTH.toLocaleString()}자 이하여야 해요.`)
        return
      }

      const { next, cursor } = insertAtSelection({
        value: current,
        insert: chunk,
        selectionStart,
        selectionEnd,
      })
      syncValue(next)

      shouldRestoreSelectionRef.current = true
      restoreSelection(cursor)
    } catch (e) {
      alert(e instanceof Error ? e.message : '이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      selectionRef.current = null
      shouldRestoreSelectionRef.current = false
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
          saveSelection()
          const file = e.target.files?.[0]
          if (file) void handleUpload(file)
          e.target.value = ''
        }}
      />

      <div ref={editorWrapRef} data-color-mode="light" className="flex h-full w-full flex-col">
        <MDEditor
          preview="edit"
          visibleDragbar={false}
          value={value}
          textareaProps={{
            name,
            placeholder,
            maxLength: MAX_CONTENT_LENGTH,
            onChange: (e) => syncValue(e.target.value),
            onKeyUp: saveSelection,
            onMouseUp: saveSelection,
            onSelect: saveSelection,
            onFocus: saveSelection,
            style: {
              fontSize: '16px',
              lineHeight: '24px',
            },
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
                execute: () => {
                  saveSelection()
                  fileInputRef.current?.click()
                },
              }
            }
            return cmd
          }}
        />

        <div className="my-2 flex w-full justify-end px-2">
          <p className="text-[12px] leading-[16px] text-[#717182]">
            {value.length.toLocaleString()} / {MAX_CONTENT_LENGTH.toLocaleString()}
          </p>
        </div>
      </div>
    </>
  )
}
