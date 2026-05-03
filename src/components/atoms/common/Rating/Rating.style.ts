import { childrenIconSize } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const ratingClass = cn(
  'Rating',
  'inline-flex items-center gap-1',
  'text-(--r-color) dark:text-(--r-dark)',
)

export const ratingSize = {
  sm: childrenIconSize.sm,
  md: childrenIconSize.md,
  lg: childrenIconSize.lg,
  none: '',
}

export const ratingSupSize = {
  sm: 'text-[0.625rem]',
  md: 'text-xs',
  lg: 'text-sm',
  none: '',
}
