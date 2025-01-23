import { cn } from '@/utils/utils'

export const avatarClass = cn(
  'flex items-center justify-center overflow-hidden rounded-full border font-bold',
)

export const avatarVariant = {
  text: {
    primary: cn('border-transparent text-primary-800 dark:text-primary-100'),
    secondary: cn('border-transparent text-secondary-800 dark:text-secondary-100'),
    terciary: cn('border-transparent text-terciary-800 dark:text-terciary-100'),
    none: '',
  },
  outlined: {
    primary: cn(
      'border-primary-800 text-primary-800 dark:border-primary-100 dark:text-primary-100',
    ),
    secondary: cn(
      'border-secondary-800 text-secondary-800 dark:border-secondary-100 dark:text-secondary-100',
    ),
    terciary: cn(
      'border-terciary-800 text-terciary-800 dark:border-terciary-100 dark:text-terciary-100',
    ),
    none: '',
  },
  contained: {
    primary: cn('border-primary-100 bg-primary-800 text-primary-100'),
    secondary: cn('border-secondary-100 bg-secondary-800 text-secondary-100'),
    terciary: cn('border-terciary-100 bg-terciary-800 text-terciary-100'),
    none: '',
  },
}

export const avatarSize = {
  sm: cn('h-8 w-8 min-w-8 text-sm'),
  md: cn('h-10 w-10 min-w-10 text-lg'),
  lg: cn('h-12 w-12 min-w-12 text-xl'),
  none: '',
}
