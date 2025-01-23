'use client'

import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'

import { Link, LinkProps } from '@/components/atoms/common/Link'
import { cn, filterOutKeys } from '@/utils/utils'

import { navLinkClass } from './Nav.style'

export type NavLink = {
  slug: string
  title: string
}

export type NavProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** NavLink array for mapping */
  navLinks: NavLink[]
  /** for menu version of Nav */
  menu?: boolean
  /** for passing aditional props to Navlink */
  linkProps?: Partial<LinkProps>
}

/** Nav component. USE CLIENT */
export const Nav = forwardRef<HTMLDivElement, NavProps>(
  ({ className, navLinks, menu, linkProps = {} }, ref) => {
    const pathName = usePathname()

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
                  menu ? 'w-full' : 'rounded-md px-3 py-1',
                  pathName === slug && 'selected',
                  linkProps.className,
                )}
                href={slug}
                variant={menu ? 'text' : 'contained'}
                size={menu ? 'md' : 'none'}
                hideShadow
                {...filterOutKeys(linkProps, ['className'])}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  },
)

Nav.displayName = 'Nav'
