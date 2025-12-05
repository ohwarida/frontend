import React from 'react';

export default async function Tag({content}: { content: string }) {
  return (
    <span className='text-xs text-gray-700'>
#{content}
    </span>
  )
}
