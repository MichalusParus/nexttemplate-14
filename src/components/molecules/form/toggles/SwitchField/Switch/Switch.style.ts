import { errorStateClass,textSize } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const switchWrapClass = cn(
  'border [&:has(input:focus-visible)]:ring-1 cursor-pointer appearance-none rounded-3xl transition-activity',
  errorStateClass,
)

export const thumbClass = cn(
  'absolute top-1/2 -translate-y-1/2 rounded-full bg-current transition-position',
)

export const switchSize = {
  sm: cn(
    'h-sm-icon',
    '[&>.SwitchThumb]:h-sm-icon [&>.SwitchThumb]:w-sm-icon',
    'w-8',
    textSize.sm,
  ),
  md: cn(
    'h-md-icon',
    '[&>.SwitchThumb]:h-md-icon [&>.SwitchThumb]:w-md-icon',
    'w-10',
    textSize.md,
  ),
  lg: cn(
    'h-lg-icon',
    '[&>.SwitchThumb]:h-lg-icon [&>.SwitchThumb]:w-lg-icon',
    'w-12',
    textSize.lg,
  ),
  none: '',
}

export const switchLeft = {
  sm: cn('left-3'),
  md: cn('left-4'),
  lg: cn('left-5'),
  none: '',
}
