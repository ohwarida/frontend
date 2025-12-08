import React from 'react';

export default function EmojiIcon({content, count}: { content: string, count: number }) {
  return (
    <span
      className="flex items-center justify-center gap-1.5 text-gray-700 border border-gray-200 px-1.5 py-2 rounded-md text-xs leading-none">
      <span>{content}</span>
      <span>{count}</span>
    </span>
  )
}
