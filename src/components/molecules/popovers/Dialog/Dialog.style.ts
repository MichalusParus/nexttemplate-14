import { cn } from '@/utils/utils'

export const dialogPosition = cn(
  'z-modal bg-bg transition-position fixed',
  'right-0 bottom-0 left-0 max-h-[90vh] rounded-t-lg',
  'md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:max-h-none md:max-w-[95vw] md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-md',
)

export const openClass = cn('translate-y-0 opacity-100', 'md:translate-y-[-50%] md:scale-100')

export const closeClass = cn('translate-y-full opacity-0', 'md:translate-y-[-50%] md:scale-95')

export const dialogPositionCentered = cn(
  'z-modal bg-bg transition-position fixed top-1/2 left-1/2 max-w-[95vw] translate-x-[-50%] translate-y-[-50%] rounded-md',
)

export const openClassCentered = cn('scale-100 opacity-100')

export const closeClassCentered = cn('opacity-0')
