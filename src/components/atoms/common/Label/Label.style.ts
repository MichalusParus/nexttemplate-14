import { cn } from '@/utils/utils'

export const collapsedState = {
  default: cn('flex-col md:flex-row'),
  always: cn('flex-col'),
  never: cn('flex-row'),
}

export const labelClass = cn('mb-1 mr-4 min-w-[40%] text-inherit')

export const fieldWrapClass = cn('flex flex-col items-start justify-start')

export const textSize = {
  sm: cn('text-sm'),
  md: cn('text-base'),
  lg: cn('text-lg'),
  none: '',
}
