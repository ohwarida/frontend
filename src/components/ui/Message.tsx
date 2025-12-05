import React from 'react';

export default async function Message({message}: { message: string }) {
  return (
    <div className='size-full'>
      {message}
    </div>
  )
}
