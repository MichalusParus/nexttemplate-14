import { PropsWithChildren } from 'react'

import { cn } from '@/utils/utils'

import { containerSize, mainXPadding } from '../Header/Header.style'

export type MainProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Main component, semantic with layout container and basic styling. */
export const Main = ({ className = '', children }: PropsWithChildren<MainProps>) => {
  return (
    <main
      className={cn('Main', 'relative h-full flex-1 bg-bg', mainXPadding, className)}
      data-testid="Main"
    >
      <div className={cn('MainContent', containerSize)}>{children}</div>
    </main>
  )
}

Main.displayName = 'Main'
