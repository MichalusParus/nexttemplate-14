import { cn } from '@/utils/utils'

import Logo from '../Logo'
import Nav from '../Nav'
import HamburgerMenu from './HamburgerMenu'
import { containerSize, headerClass, mainXPadding } from './Header.style'
import OnScrollWrap from './OnScrollWrap'

export type HeaderProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Header component, semantic with layout container and basic styling. */
export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <OnScrollWrap>
      <header className={cn('Header', headerClass, mainXPadding, className)} data-testid="Header">
        <div
          className={cn(
            'HeaderContainer',
            'flex items-center justify-between py-2 md:py-4',
            containerSize,
          )}
        >
          <div className={cn('LeftWrap', 'flex')}>
            <HamburgerMenu className="md:hidden" />
            <Logo />
            <Nav className="hidden md:flex" />
          </div>
          <div className={cn('RightWrap', 'flex')}></div>
        </div>
      </header>
    </OnScrollWrap>
  )
}

Header.displayName = 'Header'
