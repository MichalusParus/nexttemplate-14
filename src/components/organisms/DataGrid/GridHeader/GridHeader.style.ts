import { cn } from '@/utils/utils'

export const rowgroupVariant = {
  text: {
    primary: cn(
      'border-transparent bg-transparent from-bg text-primary-800 dark:from-dark-800 dark:text-primary-100',
    ),
    secondary: cn(
      'border-transparent bg-transparent from-bg text-secondary-800 dark:from-dark-800 dark:text-secondary-100',
    ),
    terciary: cn(
      'border-transparent bg-transparent from-bg text-terciary-800 dark:from-dark-800 dark:text-terciary-100',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border-primary-800 bg-transparent from-bg text-primary-800 dark:border-primary-100 dark:from-dark-800 dark:text-primary-100',
    ),
    secondary: cn(
      'border-secondary-800 bg-transparent from-bg text-secondary-800 dark:border-secondary-100 dark:from-dark-800 dark:text-secondary-100',
    ),
    terciary: cn(
      'border-terciary-800 bg-transparent from-bg text-terciary-800 dark:border-terciary-100 dark:from-dark-800 dark:text-terciary-100',
    ),
    none: '',
  },
  contained: {
    primary: cn('border-primary-100 bg-primary-800 from-primary-800 text-primary-100'),
    secondary: cn('border-secondary-100 bg-secondary-800 from-secondary-800 text-secondary-100'),
    terciary: cn('border-terciary-100 bg-terciary-800 from-terciary-800 text-terciary-100'),
    none: '',
  },
}
