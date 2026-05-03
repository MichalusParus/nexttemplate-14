'use client'
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/utils'

export type OnScrollWrapProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Client header wrap that slides in/out synced 1:1 with scroll direction. USE CLIENT */
export const OnScrollWrap = ({ className, children }: PropsWithChildren<OnScrollWrapProps>) => {
  const [translateY, setTranslateY] = useState(0)
  const lastScrollY = useRef(0)
  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    const delta = currentY - lastScrollY.current
    const headerH = ref.current?.offsetHeight ?? 80

    // Large single-frame delta (fast momentum flick on a short page, scroll restoration,
    // layout-shift jump) — snap the header to the end matching the scroll direction.
    // Resetting to visible here would pop the header in at the end of a fast downward flick.
    if (Math.abs(delta) > headerH) {
      lastScrollY.current = currentY
      setTranslateY(delta < 0 ? 0 : -headerH)
      return
    }

    setTranslateY(prev => Math.max(-headerH, Math.min(0, prev - delta)))
    lastScrollY.current = currentY
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div
      ref={ref}
      className={cn('OnScrollWrap', 'z-header fixed top-0 w-full', className)}
      style={{ transform: `translateY(${translateY}px)` }}
      data-testid="OnScrollWrap"
    >
      {children}
    </div>
  )
}

OnScrollWrap.displayName = 'OnScrollWrap'
