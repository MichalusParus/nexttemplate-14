import { cn } from '@/utils/utils'

export const drawerClass = cn('absolute z-modal transition-position')

export const openClass = {
  left: cn('left-0 opacity-100'),
  right: cn('right-0 opacity-100'),
}

export const closeClass = {
  left: cn('-left-full opacity-0'),
  right: cn('-right-full opacity-0'),
}
