import { cn } from '@/utils/utils'

export const chipClass = cn('flex max-w-max items-center rounded-3xl border')

export const chipVariant = {
  text: {
    primary: cn('border-transparent bg-transparent text-primary-800 dark:text-primary-100'),
    secondary: cn('border-transparent bg-transparent text-secondary-800 dark:text-secondary-100'),
    terciary: cn('border-transparent bg-transparent text-terciary-800 dark:text-terciary-100'),
    error: cn('border-transparent bg-transparent text-error-800 dark:text-error-100'),
    none: '',
  },
  outlined: {
    primary: cn(
      'border-primary-800 bg-transparent text-primary-800 dark:border-primary-100 dark:text-primary-100',
    ),
    secondary: cn(
      'border-secondary-800 bg-transparent text-secondary-800 dark:border-secondary-100 dark:text-secondary-100',
    ),
    terciary: cn(
      'border-terciary-800 bg-transparent text-terciary-800 dark:border-terciary-100 dark:text-terciary-100',
    ),
    error: cn(
      'border-error-800 bg-transparent text-error-800 dark:border-error-100 dark:text-error-100',
    ),
    none: '',
  },
  contained: {
    primary: cn('border-primary-800 bg-primary-800 text-primary-100'),
    secondary: cn('border-secondary-800 bg-secondary-800 text-secondary-100'),
    terciary: cn('border-terciary-800 bg-terciary-800 text-terciary-100'),
    error: cn('border-error-800 bg-error-800 text-error-100'),
    none: '',
  },
}

export const chipSize = {
  sm: cn('text-sm [&_span]:leading-4 [&_svg]:h-smIcon [&_svg]:min-w-smIcon'),
  md: cn('text-base [&_span]:leading-5 [&_svg]:h-mdIcon [&_svg]:min-w-mdIcon'),
  lg: cn('text-lg [&_span]:leading-6 [&_svg]:h-lgIcon [&_svg]:min-w-lgIcon'),
  none: '',
}
