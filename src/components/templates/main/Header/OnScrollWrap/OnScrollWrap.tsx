'use client'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { cn } from '@/utils/utils'

let lastScrollY = 0

export type OnScrollWrapProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Client header wrap for displaying header on scroll. USE CLIENT */
export const OnScrollWrap = ({ className, children }: PropsWithChildren<OnScrollWrapProps>) => {
  const [isTop, setIsTop] = useState(true)

  const handleScroll = useCallback(() => {
    if (window.scrollY <= lastScrollY) {
      setIsTop(true)
      lastScrollY = window.scrollY
    } else {
      setIsTop(false)
      lastScrollY = window.scrollY
    }
  }, [setIsTop])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      className={cn(
        'OnScrollWrap',
        'z-header w-full transition-position duration-300',
        isTop ? 'fixed top-0' : 'fixed -top-20',
        className,
      )}
      data-testid="OnScrollWrap"
    >
      {children}
    </div>
  )
}

OnScrollWrap.displayName = 'OnScrollWrap'
