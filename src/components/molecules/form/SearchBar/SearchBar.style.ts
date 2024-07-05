import { cn } from '@/utils/utils'

export const searchColor = {
  text: {
    primary: cn('text-primary-800 dark:text-primary-100'),
    secondary: cn('text-secondary-800 dark:text-secondary-100'),
    terciary: cn('text-terciary-800 dark:text-terciary-100'),
    none: '',
  },
  outlined: {
    primary: cn('text-primary-800 dark:text-primary-100'),
    secondary: cn('text-secondary-800 dark:text-secondary-100'),
    terciary: cn('text-terciary-800 dark:text-terciary-100'),
    none: '',
  },
  contained: {
    primary: cn('text-primary-100'),
    secondary: cn('text-secondary-100'),
    terciary: cn('text-terciary-100'),
    none: '',
  },
}

export const searchSize = {
  sm: cn('[&_input]:pl-8'),
  md: cn('[&_input]:pl-10'),
  lg: cn('[&_input]:pl-12'),
  none: '',
}
