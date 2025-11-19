import { cn } from '@/utils/utils'

export const alertClass = cn('flex items-start rounded-md border')

export const alertVariant = {
  text: {
    success: cn('border-transparent text-success-800 dark:text-success-100'),
    info: cn('border-transparent text-info-800 dark:text-info-100'),
    warning: cn('border-transparent text-warning-800 dark:text-warning-100'),
    error: cn('border-transparent text-error-800 dark:text-error-100'),
    none: '',
  },
  outlined: {
    success: cn(
      'border-success-800 text-success-800 dark:border-success-100 dark:text-success-100',
    ),
    info: cn('border-info-800 text-info-800 dark:border-info-100 dark:text-info-100'),
    warning: cn(
      'border-warning-800 text-warning-800 dark:border-warning-100 dark:text-warning-100',
    ),
    error: cn('border-error-800 text-error-800 dark:border-error-100 dark:text-error-100'),
    none: '',
  },
  contained: {
    success: cn('border-success-800 bg-success-800 text-success-100'),
    info: cn('border-info-800 bg-info-800 text-info-100'),
    warning: cn('border-warning-800 bg-warning-800 text-warning-100'),
    error: cn('border-error-800 bg-error-800 text-error-100'),
    none: '',
  },
}

export const alertSize = {
  sm: cn('px-1 py-0.5 text-sm'),
  md: cn('px-1.5 py-1 text-base'),
  lg: cn('px-2 py-1.5 text-lg'),
  none: '',
}
