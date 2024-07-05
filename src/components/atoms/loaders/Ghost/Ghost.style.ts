import { cn } from '@/utils/utils'

export const ghostStyle = cn(
  'relative block overflow-hidden rounded-lg bg-overlay',
  'after:-skew-x-12 after:animate-ghostAnim after:bg-gradient-to-r after:from-transparent after:via-dark-900 after:to-transparent after:opacity-10 dark:after:via-dark-500',
  'after:content=[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:translate-x-[-100%]',
)

export const ghostSize = {
  sm: cn('mx-smPX my-[3px] h-sm'),
  md: cn('mx-mdPX my-1 h-md'),
  lg: cn('mx-lgPX my-[5px] h-lg'),
  xl: cn('mx-lgPX my-1 h-xl'),
  '2xl': cn('mx-lgPX my-1 h-2xl'),
  '3xl': cn('mx-lgPX my-[3px] h-3xl'),
  none: '',
}
