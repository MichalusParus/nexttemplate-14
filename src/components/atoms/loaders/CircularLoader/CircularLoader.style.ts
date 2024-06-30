import { cn } from '@/utils/utils'

export const spinnerClass = cn('absolute -left-1 -top-1 rounded-full border-4')

export const spinnerColor = {
  primary: cn('border-primary-300 [&>.Spinner]:border-primary-800'),
  secondary: cn('border-secondary-300 [&>.Spinner]:border-secondary-800'),
  terciary: cn('border-terciary-300 [&>.Spinner]:border-terciary-800'),
  none: '',
}

export const spinnerSize = {
  sm: cn('mb-2 h-8 w-8 [&>.Spinner]:h-8 [&>.Spinner]:w-8'),
  md: cn('mb-3 h-12 w-12 [&>.Spinner]:h-12 [&>.Spinner]:w-12'),
  lg: cn('mb-4 h-16 w-16 [&>.Spinner]:h-16 [&>.Spinner]:w-16'),
  none: '',
}
