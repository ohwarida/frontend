import { FileText } from 'lucide-react'
import clsx from 'clsx'

export function EmptyMyComment() {
  return (
    <div className="flex min-h-[calc(100dvh-var(--header-h)-var(--page-pb)-88px)] flex-col lg:pb-6">
      <div className="flex flex-1">
        <div className="flex w-full flex-1">
          <div
            className={clsx(
              'flex w-full flex-1 flex-col items-center justify-center gap-4',
              'bg-transparent px-6',
              'bg-white lg:rounded-[10px] lg:border lg:border-[#E5E7EB] lg:px-0',
            )}
          >
            <FileText className="h-14 w-14 text-[#AEB0B6]" strokeWidth={2} />
            <p className="text-[14px] leading-[24px] text-[#6A7282]">아직 댓글이 없습니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}
