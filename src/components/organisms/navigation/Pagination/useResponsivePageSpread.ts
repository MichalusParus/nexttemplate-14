import { Breakpoint, useBreakpoint } from '@/components/utils/hooks/useBreakpoint'

export type PageSpread = 0 | 7 | 9 | 11 | 13 | 15 | 17

const SPREAD_MAP: Record<Breakpoint, PageSpread> = {
  xs: 7,
  sm: 9,
  md: 11,
  lg: 13,
  xl: 15,
  '2xl': 17,
  '3xl': 17,
}

export const useResponsivePageSpread = (maxSpread?: PageSpread): PageSpread => {
  const bp = useBreakpoint()
  const spread = bp ? SPREAD_MAP[bp] : 0
  return maxSpread && maxSpread < spread ? maxSpread : spread
}
