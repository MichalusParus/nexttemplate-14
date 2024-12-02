import { cn } from '@/utils/utils'

export const innerWrapClass = cn('absolute top-1/2 flex -translate-y-1/2 transition-margin')

export const controlClass = cn(
  'text-dark-300 transition-colors hover:bg-dark-950/50 hover:text-contrast focus-visible:bg-dark-950/50 focus-visible:text-contrast [&.selected]:text-contrast',
)

export const arrowClass = cn('z-modal absolute top-1/2 -translate-y-1/2 bg-dark-950/25')

export const dottWrapClass = cn(
  'z-modal absolute bottom-0 left-1/2 flex -translate-x-1/2 rounded-md bg-dark-950/25',
)
