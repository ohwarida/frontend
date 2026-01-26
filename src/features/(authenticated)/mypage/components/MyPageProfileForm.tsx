'use client'
import FieldInput from '@/components/form/FieldInput'

export function MyPageProfileForm({
  name,
  email,
  track,
}: {
  name: string
  email: string
  track: string
}) {
  return (
    <form className="w-full space-y-4">
      <FieldInput label="이름" name="name" disabled value={name} />
      <FieldInput label="이메일" name="email" disabled value={email} />
      <FieldInput label="트랙" name="track" disabled value={track} />
    </form>
  )
}
