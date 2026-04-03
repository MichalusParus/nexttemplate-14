'use client'
import { useEffect, useState } from 'react'

/** Keep in sync with --breakpoint-* in globals.css */
const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const

const BREAKPOINT_NAMES = Object.keys(BREAKPOINTS) as Breakpoint[]

export type Breakpoint = keyof typeof BREAKPOINTS

const resolveBreakpoint = (): Breakpoint | null => {
  const width = window.innerWidth
  for (let i = BREAKPOINT_NAMES.length - 1; i >= 0; i--) {
    if (width >= BREAKPOINTS[BREAKPOINT_NAMES[i]]) {
      return BREAKPOINT_NAMES[i]
    }
  }
  return null
}

const getBreakpointIndex = (bp: Breakpoint): number => BREAKPOINT_NAMES.indexOf(bp)

/** Returns the current active Tailwind breakpoint name, or null below the smallest. */
export const useBreakpoint = (): Breakpoint | null => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(() => {
    if (typeof window === 'undefined') return null
    return resolveBreakpoint()
  })

  useEffect(() => {
    const queries = BREAKPOINT_NAMES.map(name => ({
      name,
      mql: window.matchMedia(`(min-width: ${BREAKPOINTS[name]}px)`),
    }))

    const update = () => setBreakpoint(resolveBreakpoint())

    queries.forEach(({ mql }) => mql.addEventListener('change', update))
    return () => queries.forEach(({ mql }) => mql.removeEventListener('change', update))
  }, [])

  return breakpoint
}

/** Returns true when viewport is at or above the given breakpoint. */
export const useIsAbove = (bp: Breakpoint): boolean => {
  const current = useBreakpoint()
  if (!current) return false
  return getBreakpointIndex(current) >= getBreakpointIndex(bp)
}

/** Returns true when viewport is below the given breakpoint. */
export const useIsBelow = (bp: Breakpoint): boolean => {
  const current = useBreakpoint()
  if (!current) return true
  return getBreakpointIndex(current) < getBreakpointIndex(bp)
}
