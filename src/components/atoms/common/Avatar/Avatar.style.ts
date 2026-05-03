import { cn } from '@/utils/utils'

export const avatarClass = cn(
  'flex items-center justify-center overflow-hidden rounded-full border font-bold',
)

export const avatarSize = {
  sm: cn('h-8 w-8 min-w-8 text-sm'),
  md: cn('h-10 w-10 min-w-10 text-lg'),
  lg: cn('h-12 w-12 min-w-12 text-2xl'),
  none: '',
}

export const hueVariantClass = {
  contained: cn(
    'bg-(--av-bg) dark:bg-(--av-bg-dark)',
    'border-(--av-border) dark:border-(--av-border-dark)',
    'text-(--av-text) dark:text-(--av-text-dark)',
  ),
  outlined: cn(
    'border-(--av-border) dark:border-(--av-border-dark)',
    'text-(--av-text) dark:text-(--av-text-dark)',
  ),
  text: cn('border-transparent', 'text-(--av-text) dark:text-(--av-text-dark)'),
}
