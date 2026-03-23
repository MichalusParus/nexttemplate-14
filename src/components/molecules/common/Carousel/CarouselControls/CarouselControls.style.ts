import { cn } from '@/utils/utils'

export const controlClass = cn(
  'text-dark-300 transition-colors hoverable:bg-dark-950/50 hoverable:text-contrast focus-visible:bg-dark-950/50 focus-visible:text-contrast [&.selected]:text-contrast',
)

export const arrowClass = cn('absolute top-1/2 z-modal -translate-y-1/2 bg-dark-950/25')

export const autoplayButtonClass = cn(
  'absolute left-0 top-0 rounded-md bg-dark-950/25 opacity-0 focus-visible:opacity-100 group-hoverable:opacity-100',
)

export const dotWrapClass = cn(
  'absolute bottom-0 left-1/2 z-modal flex -translate-x-1/2 rounded-md bg-dark-950/25',
)
