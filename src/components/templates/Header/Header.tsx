import { cn } from '@/utils/utils'

import Logo from '../Logo'
import { containerSize, headerClass, mainXPadding } from './Header.style'

export type HeaderProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Header component, semantic with layout container and basic styling. */
export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <header className={cn('Header', headerClass, mainXPadding, className)} data-testid="Header">
      <div className={cn('HeaderContainer', 'py-2 md:py-4', containerSize)}>
        <Logo />
      </div>
    </header>
  )
}

Header.displayName = 'Header'
