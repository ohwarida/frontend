'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'
import clsx from 'clsx'
import { Avatar } from '@/components/ui/Avatar'
import { MentionUser, useMentionUsers } from '@/hooks/useMentionUsers'
import './MentionTextarea.css'
import { MENTION } from '@/constants/mention'
import { Loading } from '@/components/loading/Loading'

type MentionEntity = { userId: string | number; name: string; start: number; end: number }

type MentionTextareaProps = {
  onMentionsChange?: (mentions: MentionEntity[]) => void
  id: string
  value: string
  onChange: (value: string) => void
  maxLength?: number
  className?: string
  onScroll?: React.UIEventHandler<HTMLTextAreaElement>
  placeholder?: string
  onSubmit?: () => Promise<void>
  onMentionIdsChange?: (ids: number[]) => void
}

type MentionDataItem = {
  id: number
  display: string
  profileImageUrl: string | null
  trackName: string
}

const THRESHOLD = 5
export function MentionTextarea({
  id,
  value,
  onChange,
  maxLength,
  onSubmit,
  onScroll,
  placeholder,
  onMentionsChange,
  onMentionIdsChange,
}: MentionTextareaProps) {
  const [mentionActive, setMentionActive] = useState(false)
  const suggestionViewportRef = useRef<HTMLDivElement | null>(null)
  const textValue = (value ?? '').toString()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMentionUsers(
    20,
    mentionActive,
  )
  const [search, setSearch] = useState('')
  const lowTriggeredRef = useRef<{ key: string; triggered: boolean }>({ key: '', triggered: false })
  const members = useMemo(() => data?.pages.flatMap((p) => p) ?? [], [data])
  const lastSearchRef = useRef('')
  const suggestionsCbRef = useRef<((items: MentionDataItem[]) => void) | null>(null)
  const mentionDataRef = useRef<MentionDataItem[]>([])
  const mentionData: MentionDataItem[] = useMemo(
    () =>
      members.map((m: MentionUser) => ({
        id: m.userId,
        display: `${m.name} (${m.trackName})`,
        profileImageUrl: m.profileImageUrl,
        trackName: m.trackName,
      })),
    [members],
  )

  useEffect(() => {
    if (mentionActive) return
    lowTriggeredRef.current = { key: '', triggered: false }
  }, [mentionActive])

  useEffect(() => {
    mentionDataRef.current = mentionData
  }, [mentionData])

  useEffect(() => {
    if (!mentionActive) return
    if (isLoading) return
    if (isFetchingNextPage) return

    const filteredLen = filterBySearch(search, mentionDataRef.current).length

    if (lowTriggeredRef.current.key !== search) {
      lowTriggeredRef.current = { key: search, triggered: false }
    }

    if (filteredLen > THRESHOLD) {
      lowTriggeredRef.current.triggered = false
      return
    }

    if (lowTriggeredRef.current.triggered) return
    if (!hasNextPage) return

    lowTriggeredRef.current.triggered = true

    fetchNextPage().then(() => {
      const cb = suggestionsCbRef.current
      if (cb) cb(filterBySearch(search, mentionDataRef.current))
    })
  }, [
    mentionActive,
    search,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    members.length,
  ])

  return (
    <div className={clsx('mention-textarea')}>
      <MentionsInput
        id={id}
        value={textValue}
        placeholder={placeholder}
        a11ySuggestionsListLabel="멘션 후보"
        style={mentionInputStyle}
        className="mention"
        spellCheck={false}
        onScroll={onScroll}
        onFocus={() => setMentionActive(true)}
        onBlur={() => setMentionActive(false)}
        onChange={(e, newValue: string, _plain: string, rawMentions) => {
          onChange(newValue)

          const nextMentions: MentionEntity[] = (rawMentions ?? []).map((m) => {
            const start = (m.plainTextIndex ?? m.index ?? 0) as number
            const name = (m.display ?? '') as string
            const userId = (m.id ?? '') as string
            const end = start + name.length + 1 // @ 포함
            return { userId, name, start, end }
          })
          onMentionsChange?.(nextMentions)
          const ids = Array.from(new Set(nextMentions.map((m) => Number(m.userId))))
          onMentionIdsChange?.(ids)
          if (typeof maxLength === 'number' && newValue.length > maxLength) {
          }
        }}
        customSuggestionsContainer={(children) => (
          <div className="z-50 flex w-72 flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
            <p className="flex h-8 w-full items-center border-b border-gray-300 bg-gray-100 px-2.5 text-xs text-gray-700">
              멤버 멘션하기
            </p>

            <div
              ref={suggestionViewportRef}
              className="max-h-48 overflow-y-auto rounded-b-lg"
              onScroll={async (e) => {
                const el = e.currentTarget
                if (!hasNextPage || isFetchingNextPage) return
                if (!isNearBottom(el, 32)) return

                await fetchNextPage()

                const cb = suggestionsCbRef.current
                if (cb) cb(filterBySearch(lastSearchRef.current, mentionDataRef.current))
              }}
            >
              {isLoading && members.length === 0 ? (
                <div className="p-2">
                  <Loading />
                </div>
              ) : (
                children
              )}

              {isFetchingNextPage ? (
                <div className="p-2">
                  <Loading />
                </div>
              ) : null}
            </div>
          </div>
        )}
        allowSuggestionsAboveCursor
        onKeyDown={(e) => {
          if (e.nativeEvent?.isComposing) return

          // Shift+Enter는 줄바꿈 허용
          if (e.key === 'Enter' && e.shiftKey) return

          if (e.key === 'Enter') {
            // 멘션 후보창 떠있으면 전송 X (Enter는 멘션 선택)
            const isSuggesting = !!document.querySelector('.mention__suggestions')
            if (isSuggesting) return

            e.preventDefault()
            e.stopPropagation()
            onSubmit?.()
          }
        }}
      >
        <Mention
          trigger="@"
          data={(q, callback) => {
            setMentionActive(true)

            const nextQ = (q ?? '').trim()
            lastSearchRef.current = nextQ
            suggestionsCbRef.current = callback

            setSearch((prev) => (prev === nextQ ? prev : nextQ))

            callback(filterBySearch(nextQ, mentionDataRef.current))
          }}
          appendSpaceOnAdd
          markup={MENTION}
          displayTransform={(_, display) => `@${display}`}
          style={{
            color: '#155DFC',
            fontWeight: 600,
            borderRadius: '4px',
            backgroundColor: 'rgba(21, 93, 252, 0.18)',
          }}
          renderSuggestion={(entry, _search, highlightedDisplay, _index, focused) => {
            const item = entry as MentionDataItem

            return (
              <div
                ref={(el) => {
                  if (!focused || !el) return
                  const viewport = suggestionViewportRef.current
                  if (!viewport) return
                  requestAnimationFrame(() => ensureItemVisible(viewport, el))
                }}
                className={clsx(
                  'w-full cursor-pointer py-2 text-left',
                  focused ? 'bg-blue-500' : '',
                )}
              >
                {isLoading ? (
                  <div>
                    <Loading />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-2.5">
                    <Avatar size="xs" alt={`${item.display} 프로필`} src={item.profileImageUrl} />
                    <span className={clsx('text-sm', focused ? 'text-white' : 'text-gray-800')}>
                      {highlightedDisplay}
                    </span>
                    <span className={clsx('text-[10px]', focused ? 'text-white' : 'text-gray-400')}>
                      @{item.id}
                    </span>
                  </div>
                )}
              </div>
            )
          }}
        />
      </MentionsInput>
    </div>
  )
}

function filterBySearch(q: string, list: MentionDataItem[]) {
  const s = (q ?? '').trim()
  return !s ? list : list.filter((u) => u.display.startsWith(s))
}

function isNearBottom(el: HTMLElement, offset = 24) {
  return el.scrollTop + el.clientHeight >= el.scrollHeight - offset
}

function ensureItemVisible(container: HTMLElement, item: HTMLElement) {
  const c = container.getBoundingClientRect()
  const i = item.getBoundingClientRect()

  // 위로 벗어남
  if (i.top < c.top) {
    container.scrollTop -= c.top - i.top
    return
  }

  // 아래로 벗어남
  if (i.bottom > c.bottom) {
    container.scrollTop += i.bottom - c.bottom
  }
}

const mentionInputStyle = {
  control: {
    fontFamily: 'inherit',
    fontSize: 14,
    letterSpacing: 'inherit',
  },
  highlighter: {
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: 14,
    letterSpacing: 'inherit',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    overflowY: 'auto',
    color: '#171719',
  },
  input: {
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: 14,
    letterSpacing: 'inherit',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    background: 'transparent',
    width: '100%',
    height: '100%',
    // 겹침 방지: input 글자는 숨기고 highlighter가 보여줌
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    caretColor: '#171719',

    border: 0,
    outline: 'none',
  },
  suggestions: {
    list: { margin: 0, padding: 0, listStyleType: 'none' },
    item: { margin: 0, padding: 0 },
  },
} as const
