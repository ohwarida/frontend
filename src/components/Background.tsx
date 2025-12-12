import React from 'react'

export default async function Background() {
  return (
    <div className="absolute inset-0 -z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated blur circles */}
      <div className="absolute top-20 left-10 h-96 w-96 animate-pulse rounded-full bg-blue-200/40 blur-3xl" />
      <div
        className="absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full bg-purple-200/40 blur-3xl"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-pink-200/30 blur-3xl"
        style={{ animationDelay: '2s' }}
      />
    </div>
  )
}
