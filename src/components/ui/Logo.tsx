import Image from 'next/image'
import Link from 'next/link'

export default async function Logo() {
  return (
    <Link href="/">
      <Image src="/assets/logo.svg" alt="뎁스 로고" width={85} height={36} />
    </Link>
  )
}
