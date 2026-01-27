import React from 'react'
import { REGEX } from '@/constants/mention'

export function renderMentionText(text: string) {
  const nodes: React.ReactNode[] = []

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = REGEX.exec(text)) !== null) {
    const [full, name] = match
    const start = match.index
    const end = start + full.length

    if (start > lastIndex) nodes.push(text.slice(lastIndex, start))

    nodes.push(
      <span
        key={`${start}-${end}`}
        className="cursor-pointer font-semibold text-[#155DFC] opacity-100 hover:opacity-80"
        style={{
          backgroundColor: 'rgba(21, 93, 252, 0.18)',
          borderRadius: '4px',
        }}
      >
        @{name}
      </span>,
    )

    lastIndex = end
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}
