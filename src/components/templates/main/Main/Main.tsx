import { PropsWithChildren } from 'react'

import { cn } from '@/utils/utils'

import { containerSize, mainXPadding } from '../Header/Header.style'
import { mainClass } from './Main.style'

export type MainProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Main component, semantic with layout container and basic styling. */
export const Main = ({ className, children }: PropsWithChildren<MainProps>) => {
  return (
    <main className={cn('Main', mainClass, mainXPadding, className)} data-testid="Main">
      <div className={cn('MainContent', containerSize)}>{children}</div>
    </main>
  )
}

Main.displayName = 'Main'
