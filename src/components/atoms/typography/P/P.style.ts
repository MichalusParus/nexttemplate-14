import { cn } from '@/utils/utils'

export const PColor = {
  primary: cn('text-primary-800 dark:text-primary-100'),
  secondary: cn('text-secondary-800 dark:text-secondary-100'),
  terciary: cn('text-terciary-800 dark:text-terciary-100'),
  none: cn('text-text dark:text-darkText'),
}

export const PSize = {
  sm: cn('text-sm'),
  md: cn('text-base'),
  lg: cn('text-lg'),
  none: '',
}
