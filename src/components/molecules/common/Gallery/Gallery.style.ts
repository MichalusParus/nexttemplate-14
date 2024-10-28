import { cn } from '@/utils/utils'

export const innerWrapClass = cn('absolute top-1/2 flex -translate-y-1/2 transition-margin')

export const controlClass = cn(
  'hover:bg-dark-950/50 focus-visible:bg-dark-950/50 text-dark-300 transition-colors hover:text-darkText focus-visible:text-darkText [&.selected]:text-darkText',
)

export const arrowClass = cn('bg-dark-950/25 absolute top-1/2 z-50 -translate-y-1/2')

export const dottWrapClass = cn(
  'bg-dark-950/25 absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 rounded-md',
)
