export default function LoadingCard({ message = '데이터를 불러오는 중...' }) {
  return (
    <div className="mt-16 flex size-full items-center justify-center">
      <div className="h-[150px] w-[320px] rounded-xl bg-white px-10 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.14)]">
        <div className="mb-3 flex justify-center gap-2" aria-hidden="true">
          <span
            className="animate-dot-bounce inline-block size-[7px] rounded-full bg-red-500"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="animate-dot-bounce inline-block size-[7px] rounded-full bg-green-500"
            style={{ animationDelay: '140ms' }}
          />
          <span
            className="animate-dot-bounce inline-block size-[7px] rounded-full bg-blue-500"
            style={{ animationDelay: '280ms' }}
          />
        </div>
        <p className="text-center text-sm font-medium text-gray-600">{message}</p>
      </div>
    </div>
  )
}
