'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import Link from '@/components/atoms/common/Link'
import { PUBLICROUTES } from '@/utils/routes'
import { cn } from '@/utils/utils'

import { navLinkClass } from './Nav.style'

export type NavProps = {
  /** for passing custom tailwind classes */
  className?: string
  menu?: boolean
}

/** Nav component. USE CLIENT */
export const Nav = forwardRef<HTMLDivElement, NavProps>(({ className, menu }, ref) => {
  const pathName = usePathname()
  const t = useTranslations('Navigation')

  const navLinks = [
    {
      slug: PUBLICROUTES.home,
      title: t('home'),
    },
    {
      slug: PUBLICROUTES.about,
      title: t('about'),
    },
  ]

  return (
    <nav className={className} ref={ref}>
      <ul className={cn('NavList', menu ? 'flex flex-col' : 'flex pl-4')} role="listbox">
        {navLinks.map(({ slug, title }) => (
          <li
            key={slug}
            className={cn('NavOption', 'flex justify-center')}
            role="option"
            aria-selected={pathName === slug}
          >
            <Link
              className={cn(
                'Navlink',
                navLinkClass,
                menu ? 'w-full' : 'px-3 py-1',
                pathName === slug && 'selected',
              )}
              href={slug}
              variant={menu ? 'text' : 'contained'}
              size={menu ? 'md' : 'none'}
              disableUpperCase
              hideShadow
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
})

Nav.displayName = 'Nav'
