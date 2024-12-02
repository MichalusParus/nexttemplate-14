import { cn } from '@/utils/utils'

import { Logo } from '../../common/Logo'
import { containerSize, mainXPadding } from '../../main/Header/Header.style'

export type HeaderProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** SimpleHeader component for simple Layout, semantic with layout container and basic styling. */
export const SimpleHeader = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn('SimpleHeader', 'my-6 md:my-12 lg:my-16', mainXPadding, className)}
      data-testid="SimpleHeader"
    >
      <div
        className={cn(
          'HeaderContainer',
          'flex items-center justify-center py-2 md:py-4',
          containerSize,
        )}
      >
        <Logo />
      </div>
    </header>
  )
}

SimpleHeader.displayName = 'SimpleHeader'
