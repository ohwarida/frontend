import React from 'react';
import Tag from "@/components/ui/Tag";
import EmojiIcon from "@/components/ui/EmojiIcon";
import EmojiPicker from "@/components/emoji-picker/EmojiPicker";
import Link from "next/link";

export default function PageCard() {
  return (
    <Link className='px-4 py-6 bg-white flex flex-col justify-center rounded-md' href=''>
      <div className=' gap-0.5 leading-none mb-2'>
        <p className='text-sm inline'>🤦‍♂️ 김개발</p>
        <span className='text-[8px] text-gray-400'>・</span>
        <span className='text-xs text-gray-400'>2시간 전</span>
      </div>
      <div className='space-y-1.5'>
        <h5 className="text-lg line-clamp-2" title={undefined}>
          주니어 개발자를 위한 포토폴리오 작성 가이드
        </h5>
        <div className='flex items-center gap-2'>
          <Tag content='취업'/>
          <Tag content='포토폴리오'/>
          <Tag content='주니어'/>
        </div>
        <div className='flex items-center gap-2'>
          <EmojiIcon content='❤️' count={5}/>
          <EmojiIcon content='🦇' count={3}/>
          <EmojiPicker/>
          {/* todo 카운트 어떻게 할지  */}
          <span className='text-xs leading-0 text-gray-400'>8 reaction</span>
        </div>
      </div>
    </Link>
  )
}
