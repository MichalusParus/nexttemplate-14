import { PropsWithChildren } from 'react'

import { cn } from '@/utils/utils'

import { containerSize, mainXPadding } from '../../main/Header/Header.style'

export type MainProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** SimpleMain component for simple Layout, semantic with layout container and basic styling. */
export const SimpleMain = ({ className, children }: PropsWithChildren<MainProps>) => {
  return (
    <main className={cn('SimpleMain', mainXPadding, className)} data-testid="SimpleMain">
      <div className={cn('MainContent', 'flex flex-col items-center pb-12', containerSize)}>
        {children}
      </div>
    </main>
  )
}

SimpleMain.displayName = 'SimpleMain'
