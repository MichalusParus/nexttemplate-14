import { cn } from '@/utils/utils'

export const PColor = {
  primary: cn('text-primary-800 dark:text-primary-100'),
  secondary: cn('text-secondary-800 dark:text-secondary-100'),
  terciary: cn('text-terciary-800 dark:text-terciary-100'),
  none: cn('text-inherit dark:text-inherit'),
}

export const PSize = {
  sm: cn('text-sm'),
  md: cn('text-base'),
  lg: cn('text-lg'),
  xl: cn('text-xl'),
  '2xl': cn('text-2xl'),
  '3xl': cn('text-3xl'),
  none: '',
}

export const GhostAlign = {
  'text-left': 'items-start',
  'text-center': 'items-center',
  'text-right': 'items-end',
}
