import { errorStateClass } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const switchWrapClass = cn(
  'transition-activity relative cursor-pointer appearance-none rounded-3xl border [&:has(input:focus-visible)]:ring-1',
  errorStateClass,
)

export const thumbClass = cn(
  'transition-position absolute top-px left-px aspect-square h-[calc(100%-2px)] rounded-full bg-current',
)

export const switchSize = {
  sm: cn('h-sm-icon w-8'),
  md: cn('h-sm-icon md:h-md-icon w-10'),
  lg: cn('h-md-icon md:h-lg-icon w-12'),
  none: '',
}

export const switchThumbOn = {
  sm: 'translate-x-3',
  md: 'translate-x-4',
  lg: 'translate-x-5',
  none: '',
}

export const switchThumbOff = 'translate-x-0'
