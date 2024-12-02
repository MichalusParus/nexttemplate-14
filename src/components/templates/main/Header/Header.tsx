import { useTranslations } from 'next-intl'

import { ADMINROUTES, PRIVATEROUTES, PUBLICROUTES } from '@/utils/routes'
import { cn } from '@/utils/utils'

import { Logo } from '../../common/Logo'
import { Nav } from '../../common/Nav'
import { HamburgerMenu } from './HamburgerMenu'
import { containerSize, headerClass, mainXPadding } from './Header.style'
import { OnScrollWrap } from './OnScrollWrap'

export type HeaderProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Header component, semantic with layout container and basic styling. */
export const Header = ({ className }: HeaderProps) => {
  const t = useTranslations('Navigation')

  const navLinks = [
    {
      slug: PRIVATEROUTES.home,
      title: t('home'),
    },
    {
      slug: PUBLICROUTES.login,
      title: t('login'),
    },
    {
      slug: PUBLICROUTES.register,
      title: t('register'),
    },
    {
      slug: ADMINROUTES.dashboard,
      title: t('dashboard'),
    },
  ]

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
            <HamburgerMenu className="md:hidden" navLinks={navLinks} />
            <Logo />
            <Nav className="hidden md:flex" navLinks={navLinks} />
          </div>
          <div className={cn('RightWrap', 'flex')}></div>
        </div>
      </header>
    </OnScrollWrap>
  )
}

Header.displayName = 'Header'
