import { cn } from '@/utils/utils'

export const ghostStyle = cn(
  'relative block overflow-hidden rounded-lg bg-dark-950/25',
  'after:-skew-x-12 after:animate-ghost after:bg-gradient-to-r after:from-transparent after:via-dark-900 after:to-transparent after:opacity-10 dark:after:via-dark-500',
  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0",
)

export const ghostSize = {
  sm: cn('my-[3px] h-sm'),
  md: cn('my-1 h-md'),
  lg: cn('my-[5px] h-lg'),
  xl: cn('my-1 h-xl'),
  '2xl': cn('my-1 h-2xl'),
  '3xl': cn('my-[3px] h-3xl'),
  none: '',
}
