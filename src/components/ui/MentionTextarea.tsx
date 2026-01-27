'use client'

import { useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

const USERS = [
  { id: '1', display: '홍길동' },
  { id: '2', display: '김철수' },
  { id: '3', display: '이영희' },
]

const mentionInputStyle = {
  control: {
    fontSize: 14,
    lineHeight: 1.4,
    border: '1px solid #d1d5db',
    borderRadius: 12,
  },
  highlighter: {
    padding: 12,
    minHeight: 120,
  },
  input: {
    padding: 12,
    minHeight: 120,
    outline: 'none',
    border: 0,
  },
  suggestions: {
    list: {
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    item: {
      padding: '10px 12px',
    },
  },
} as const

export function MentionTextarea() {
  const [value, setValue] = useState('')

  return (
    <MentionsInput
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      style={mentionInputStyle}
      placeholder="@ 입력해서 멘션..."
      a11ySuggestionsListLabel="멘션 후보"
    >
      <Mention
        trigger="@"
        data={USERS}
        appendSpaceOnAdd
        markup="@[__display__](__id__)"
        displayTransform={(_, display) => `@${display}`}
        style={{ backgroundColor: 'rgba(59,130,246,0.18)' }}
      />
    </MentionsInput>
  )
}
