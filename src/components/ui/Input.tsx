import React from 'react';

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
}

export default async function Input({
                                      required = false,
                                      icon,
                                      ...rest
                                    }: BaseInputProps) {
  return (
    <div className='relative'>
      <input className='bg-gray-100 py-2.5 pl-8.5 pr-2 rounded-md text-xs' placeholder='검색어를 입력하세요...' {...rest}/>
      {/* todo 아이콘 배치 */}
      {icon && <span className='absolute inset-y-0 flex items-center justify-center left-2'>
        {icon}
      </span>}
    </div>
  )
}
