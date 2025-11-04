import { useEffect, useState } from 'react'

export enum Breakpoints {
  xs = 475,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  '2xl' = 1536,
}

export type PageSpread = 0 | 7 | 9 | 11 | 13 | 15 | 17

const getPageSpreadFromWidth = (width: number): PageSpread => {
  if (width >= Breakpoints['2xl']) return 17
  if (width >= Breakpoints.xl) return 15
  if (width >= Breakpoints.lg) return 13
  if (width >= Breakpoints.md) return 11
  if (width >= Breakpoints.sm) return 9
  if (width >= Breakpoints.xs) return 7
  return 0
}

export const useResponsivePageSpread = (maxSpread?: PageSpread): PageSpread => {
  const [pageSpread, setPageSpread] = useState<PageSpread>(() => {
    if (typeof window === 'undefined') return 0
    return getPageSpreadFromWidth(window.innerWidth)
  })

  useEffect(() => {
    const updateSpread = () => {
      const newSpread = getPageSpreadFromWidth(window.innerWidth)
      const finalSpread = maxSpread && maxSpread < newSpread ? maxSpread : newSpread
      setPageSpread(finalSpread)
    }

    updateSpread()
    window.addEventListener('resize', updateSpread)
    return () => window.removeEventListener('resize', updateSpread)
  }, [maxSpread])

  return pageSpread
}
