import { cn } from '@/utils/utils'

export const dialogPosition = cn(
  'fixed left-1/2 top-1/2 z-modal max-w-[95vw] translate-x-[-50%] translate-y-[-50%] rounded-md bg-bg transition-position',
)

export const openClass = cn('scale-100 opacity-100')

export const closeClass = cn('scale-90 opacity-0')
