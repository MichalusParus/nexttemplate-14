import { cn } from '@/utils/utils'

export const modalPosition = cn(
  'fixed left-1/2 top-1/2 z-50 max-w-[95vw] translate-x-[-50%] translate-y-[-50%] rounded-md bg-bg transition-dropdown',
)

export const openClass = cn('visible scale-100 opacity-100')

export const closeClass = cn('invisible scale-90 opacity-0')
