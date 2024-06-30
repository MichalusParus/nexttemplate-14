import { cn } from '@/utils/utils'

export const dropdownClass = cn('transition-dropdown')

export const openClass = {
  relative: cn('visible z-[35] -translate-y-1 opacity-100'),
  left: cn('visible absolute left-0 top-full z-[35] -translate-y-1 opacity-100'),
  right: cn('visible absolute right-0 top-full z-[35] -translate-y-1 opacity-100'),
  top: cn(
    'visible absolute bottom-full left-1/2 z-[35] -translate-x-1/2 translate-y-1 opacity-100',
  ),
}

export const closeClass = {
  relative: cn('invisible max-h-0 -translate-y-8 opacity-0'),
  left: cn('invisible absolute left-0 top-0 opacity-0'),
  right: cn('invisible absolute right-0 top-0 opacity-0'),
  top: cn('invisible absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0'),
}
