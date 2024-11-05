'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { HamburgerIcon } from '@/components/atoms/icons'
import { Drawer } from '@/components/molecules/popovers/Drawer'
import { cn } from '@/utils/utils'

import { Nav } from '../../Nav'

export type HamburgerMenuProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Hamburger Main Menu component, build with drawer. USE CLIENT */
export const HamburgerMenu = ({ className }: HamburgerMenuProps) => {
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
        onClick={() => setIsOpen(prev => !prev)}
      >
        <HamburgerIcon className="h-9 w-9" isOpen={isOpen} />
      </Button>
      <Drawer
        className="fixed"
        name="hamburgerMainMenu"
        isOpen={isOpen}
        offsetY="top-smHeaderHeight bottom-0"
        width="w-2/3"
        modal
        paperProps={{ className: 'dark:border-primary-950 rounded-none' }}
        onClose={() => setIsOpen(false)}
      >
        <Nav menu ref={navRef} />
      </Drawer>
    </div>
  )
}

HamburgerMenu.displayName = 'HamburgerMenu'
