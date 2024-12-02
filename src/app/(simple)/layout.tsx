import { PropsWithChildren } from 'react'

import { SimpleHeader } from '@/components/templates/simple/SimpleHeader'
import { SimpleMain } from '@/components/templates/simple/SimpleMain'

export default function SimpleLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 bg-primary-800">
      <SimpleHeader />
      <SimpleMain>{children}</SimpleMain>
    </div>
  )
}
