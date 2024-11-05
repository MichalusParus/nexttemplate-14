import { cn } from '@/utils/utils'

export const paperVariant = {
  text: {
    primary: 'bg-bg dark:bg-darkBg from-bg dark:from-darkBg',
    secondary: 'bg-bg dark:bg-darkBg from-bg dark:from-darkBg',
    terciary: 'bg-bg dark:bg-darkBg from-bg dark:from-darkBg',
    none: '',
  },
  outlined: {
    primary: cn(
      'border border-primary-800 bg-bg from-bg dark:border-primary-100 dark:bg-darkBg dark:from-darkBg',
    ),
    secondary: cn(
      'border border-secondary-800 bg-bg from-bg dark:border-secondary-100 dark:bg-darkBg dark:from-darkBg',
    ),
    terciary: cn(
      'border border-terciary-800 bg-bg from-bg dark:border-terciary-100 dark:bg-darkBg dark:from-darkBg',
    ),
    none: '',
  },
  contained: {
    primary: cn('border border-primary-800 bg-primary-800 from-primary-800 text-primary-100'),
    secondary: cn(
      'border border-secondary-800 bg-secondary-800 from-secondary-800 text-secondary-100',
    ),
    terciary: cn('border border-terciary-800 bg-terciary-800 from-terciary-800 text-terciary-100'),
    none: '',
  },
}
