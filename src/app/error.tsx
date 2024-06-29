'use client'
import { useRouter } from 'next/navigation'

import { ErrorPageProps } from '@/utils/types'

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter()
  console.error(error)

  return (
    <>
      <p>Internal Error</p>
      <div className="flex justify-center gap-3">
        <button onClick={router.back}>back</button>
        <button onClick={reset}>reset</button>
      </div>
    </>
  )
}
