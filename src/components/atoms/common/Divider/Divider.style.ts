import { cn } from '@/utils/utils'

export const dividerColor = {
  primary: cn('bg-primary-800 dark:bg-primary-50'),
  secondary: cn('bg-secondary-800 dark:bg-secondary-100'),
  terciary: cn('bg-terciary-800 dark:bg-terciary-100'),
  none: 'bg-current',
}

export const labelColor = {
  primary: cn('text-primary-800 dark:text-primary-50'),
  secondary: cn('text-secondary-800 dark:text-secondary-100'),
  terciary: cn('text-terciary-800 dark:text-terciary-100'),
  none: 'text-current dark:text-current',
}
