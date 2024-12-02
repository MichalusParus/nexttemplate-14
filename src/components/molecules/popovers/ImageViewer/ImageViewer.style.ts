import { cn } from '@/utils/utils'

export const openClass = cn('z-modal fixed left-0 top-0 block h-[100vh] w-[100vw]')

export const closeButtonClass = cn(
  'z-modal fixed right-4 top-4 border-0 bg-dark-600 text-dark-300 transition-colors hover:bg-dark-950/50 hover:text-contrast focus-visible:bg-dark-950/50 focus-visible:text-contrast',
)
