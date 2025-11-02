import { cn } from '@/utils/utils'

export const inputWrapClass = cn(
  'shrink-0 cursor-pointer appearance-none overflow-hidden rounded-md transition-activity focus:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50 [&.disabled]:cursor-not-allowed [&.disabled]:opacity-50',
)

export const checkboxVariant = {
  text: {
    primary: cn(
      'border border-transparent bg-primary-100 focus-within:bg-primary-200 group-hover:bg-primary-200 [&.checked]:bg-primary-200',
      'dark:bg-primary-900/50 dark:focus-within:bg-primary-900 dark:group-hover:bg-primary-900 dark:[&.checked]:bg-primary-900',
    ),
    secondary: cn(
      'border border-transparent bg-secondary-100 focus-within:bg-secondary-200 group-hover:bg-secondary-200 [&.checked]:bg-secondary-200',
      'dark:bg-secondary-900/50 dark:focus-within:bg-secondary-900 dark:group-hover:bg-secondary-900 dark:[&.checked]:bg-secondary-900',
    ),
    terciary: cn(
      'border border-transparent bg-terciary-100 focus-within:bg-terciary-200 group-hover:bg-terciary-200 [&.checked]:bg-terciary-200',
      'dark:bg-terciary-900/50 dark:focus-within:bg-terciary-900 dark:group-hover:bg-terciary-900 dark:[&.checked]:bg-terciary-900',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border border-primary-800 bg-primary-100 focus-within:bg-primary-200 group-hover:bg-primary-200 [&.checked]:bg-primary-200',
      'dark:border-primary-100 dark:bg-primary-900/50 dark:focus-within:bg-primary-900 dark:group-hover:bg-primary-900 dark:[&.checked]:bg-primary-900',
    ),
    secondary: cn(
      'border border-secondary-800 bg-secondary-100 focus-within:bg-secondary-200 group-hover:bg-secondary-200 [&.checked]:bg-secondary-200',
      'dark:border-secondary-100 dark:bg-secondary-900/50 dark:focus-within:bg-secondary-900 dark:group-hover:bg-secondary-900 dark:[&.checked]:bg-secondary-900',
    ),
    terciary: cn(
      'border border-terciary-800 bg-terciary-100 focus-within:bg-terciary-200 group-hover:bg-terciary-200 [&.checked]:bg-terciary-200',
      'dark:border-terciary-100 dark:bg-terciary-900/50 dark:focus-within:bg-terciary-900 dark:group-hover:bg-terciary-900 dark:[&.checked]:bg-terciary-900',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'border border-primary-900 bg-primary-600 focus-within:bg-primary-700 group-hover:bg-primary-700 [&.checked]:bg-primary-700',
    ),
    secondary: cn(
      'border border-secondary-900 bg-secondary-600 focus-within:bg-secondary-700 group-hover:bg-secondary-700 [&.checked]:bg-secondary-700',
    ),
    terciary: cn(
      'border border-terciary-900 bg-terciary-600 focus-within:bg-terciary-700 group-hover:bg-terciary-700 [&.checked]:bg-terciary-700',
    ),
    none: '',
  },
}

export const checkVariant = {
  text: {
    primary: cn(
      'text-primary-800 dark:text-primary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-400',
    ),
    secondary: cn(
      'text-secondary-800 dark:text-secondary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-400',
    ),
    terciary: cn(
      'text-terciary-800 dark:text-terciary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-400',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'text-primary-800 dark:text-primary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-400',
    ),
    secondary: cn(
      'text-secondary-800 dark:text-secondary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-400',
    ),
    terciary: cn(
      'text-terciary-800 dark:text-terciary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-400',
    ),
    none: '',
  },
  contained: {
    primary: cn('text-primary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-200'),
    secondary: cn('text-secondary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-200'),
    terciary: cn('text-terciary-100 [&.disabled]:cursor-not-allowed [&.disabled]:text-dark-200'),
    none: '',
  },
}

export const checkboxSize = {
  sm: cn('h-smIcon w-smIcon'),
  md: cn('h-mdIcon w-mdIcon'),
  lg: cn('h-lgIcon w-lgIcon'),
  none: '',
}

export const checkLabelSize = {
  sm: cn('text-sm'),
  md: cn('text-base'),
  lg: cn('text-lg'),
  none: '',
}

export const checkboxMargin = {
  sm: cn('mb-1 mr-3'),
  md: cn('mb-2 mr-4'),
  lg: cn('mb-3 mr-5'),
  none: '',
}

export const disabledVariant = {
  text: cn(
    '[&.disabled]:border-transparent [&.disabled]:bg-dark-200 [&.disabled]:shadow-none group-hover:[&.disabled]:bg-dark-200',
    'dark:[&.disabled]:bg-dark-200 dark:[&.disabled]:text-dark-500',
  ),
  outlined: cn(
    '[&.disabled]:border-dark-400 [&.disabled]:bg-dark-200 [&.disabled]:shadow-none group-hover:[&.disabled]:bg-dark-200',
    'dark:[&.disabled]:border-dark-500 dark:[&.disabled]:bg-dark-200 dark:[&.disabled]:text-dark-500',
  ),
  contained: cn(
    '[&.disabled]:border-dark-400 [&.disabled]:bg-dark-400 [&.disabled]:shadow-none group-hover:[&.disabled]:bg-dark-400',
    'dark:[&.disabled]:border-dark-500 dark:[&.disabled]:bg-dark-500 dark:[&.disabled]:text-dark-500',
  ),
}
