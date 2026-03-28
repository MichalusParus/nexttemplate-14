'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { HamburgerIcon } from '@/components/atoms/icons'
import { Drawer } from '@/components/molecules/popovers/Drawer'
import { Nav, NavLink } from '@/components/templates/common/Nav'
import { cn } from '@/utils/utils'

export type HamburgerMenuProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** NavLink array for mapping */
  navLinks: NavLink[]
}

/** Hamburger Main Menu component, build with drawer. USE CLIENT */
export const HamburgerMenu = ({ className, navLinks }: HamburgerMenuProps) => {
  const navRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (navRef.current) {
      const element = navRef.current
      element.addEventListener('click', handleClick)
      return () => element.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  return (
    <div
      className={cn('HamburgerMenu', 'flex items-center justify-center pr-3', className)}
      data-testid="HamburgerMenu"
    >
      <Button
        className="border-0 bg-transparent"
        variant="contained"
        size="none"
        hideShadow
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="hamburgerMainMenu"
        aria-owns="hamburgerMainMenu"
        ref={anchorRef}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <HamburgerIcon className="h-9 w-9" isOpen={isOpen} />
      </Button>
      <Drawer
        className="fixed md:hidden"
        name="hamburgerMainMenu"
        isOpen={isOpen}
        anchorRef={anchorRef}
        offsetY="top-sm-header bottom-0"
        width="w-2/3"
        paperProps={{ className: 'dark:border-primary-950 rounded-none' }}
        onClose={() => setIsOpen(false)}
      >
        <Nav navLinks={navLinks} menu ref={navRef} />
      </Drawer>
    </div>
  )
}

HamburgerMenu.displayName = 'HamburgerMenu'
