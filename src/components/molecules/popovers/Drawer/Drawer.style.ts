import { cn } from '@/utils/utils'

export const drawerClass = cn('transition-position absolute z-50 rounded-md bg-bg')

export const openClass = {
  left: cn('visible left-0 opacity-100'),
  right: cn('visible right-0 opacity-100'),
}

export const closeClass = {
  left: cn('invisible -left-full opacity-0'),
  right: cn('invisible -right-full opacity-0'),
}
