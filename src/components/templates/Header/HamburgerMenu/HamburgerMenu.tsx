'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import Combobox from '@/components/atoms/common/Combobox'
import Hamburger from '@/components/atoms/icons/Hamburger'
import Drawer from '@/components/molecules/popovers/Drawer'
import { cn } from '@/utils/utils'

import Nav from '../../Nav'

export type HamburgerMenuProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Hamburger Main Menu component, build with drawer. USE CLIENT */
export const HamburgerMenu = ({ className = '' }: HamburgerMenuProps) => {
  const navRef = useRef<HTMLDivElement | null>(null)
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
      className={cn('HamburgerMenu', 'flex items-center justify-center pr-2', className)}
      data-testid="HamburgerMenu"
    >
      <Combobox
        className="border-0 bg-transparent"
        name="hamburgerMainMenu"
        isOpen={isOpen}
        hasPopup="menu"
        variant="contained"
        size="none"
        hideShadow
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Hamburger className="h-9 w-10" isOpen={isOpen} />
      </Combobox>
      <Drawer
        className="fixed"
        name="hamburgerMainMenu"
        isOpen={isOpen}
        offsetY="top-smHeaderHeight bottom-0"
        width="w-2/3"
        isModal
        paperProps={{ className: 'dark:border-primary-950 rounded-none' }}
        onClose={() => setIsOpen(false)}
      >
        <Nav menu ref={navRef} />
      </Drawer>
    </div>
  )
}

HamburgerMenu.displayName = 'HamburgerMenu'
