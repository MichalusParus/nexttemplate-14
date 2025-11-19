import { childrenIconSize, textSize } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const chipClass = cn(
  'flex max-w-max items-center gap-1 rounded-3xl border px-2 text-inherit',
)

export const chipSize = {
  sm: cn(childrenIconSize.sm, textSize.sm, 'leading-4'),
  md: cn(childrenIconSize.md, textSize.md, 'leading-5'),
  lg: cn(childrenIconSize.lg, textSize.lg, 'leading-6'),
  none: '',
}
