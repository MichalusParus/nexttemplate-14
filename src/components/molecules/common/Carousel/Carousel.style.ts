import { cn } from '@/utils/utils'

export const innerWrapClass = cn('absolute top-1/2 flex -translate-y-1/2 transition-margin')

export const controlClass = cn(
  'text-dark-300 transition-colors hover:text-dark-50 [&.selected]:text-dark-50',
)

export const arrowClass = cn('absolute top-1/2 z-50 -translate-y-1/2 bg-dark-950 bg-opacity-20')

export const dottWrapClass = cn(
  'absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 rounded-md bg-dark-950 bg-opacity-20',
)
