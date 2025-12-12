import React from 'react'

export default function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <p className="text-sm text-red-500">{errorMessage}</p>
}
