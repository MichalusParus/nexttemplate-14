import { cn } from '@/utils/utils'

export const spinnerClass = cn('absolute -left-0.5 -top-0.5 rounded-full border-2')

export const spinnerColor = {
  primary: cn('border-primary-300 [&>.Spinner]:border-primary-800'),
  secondary: cn('border-secondary-300 [&>.Spinner]:border-secondary-800'),
  terciary: cn('border-terciary-300 [&>.Spinner]:border-terciary-800'),
  none: cn('border-current/30 [&>.Spinner]:border-current'),
}

export const spinnerSize = {
  sm: cn('h-sm-icon w-sm-icon [&>.Spinner]:h-sm-icon [&>.Spinner]:w-sm-icon'),
  md: cn('h-md-icon w-md-icon [&>.Spinner]:h-md-icon [&>.Spinner]:w-md-icon'),
  lg: cn('h-lg-icon w-lg-icon [&>.Spinner]:h-lg-icon [&>.Spinner]:w-lg-icon'),
  none: '',
}
