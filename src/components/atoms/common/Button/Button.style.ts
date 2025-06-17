import { cn } from '@/utils/utils'

export const buttonClass = cn(
  'relative items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-activity focus:outline-none [&.error]:border-error-800 [&.error]:shadow-error',
)

export const buttonVariant = {
  text: {
    primary: cn(
      'border-transparent bg-transparent text-primary-800 dark:text-primary-100',
      'hover:bg-primary-100 focus-visible:bg-primary-100 active:bg-primary-50 group-focus-visible:bg-primary-100',
      'dark:hover:bg-primary-900 dark:focus-visible:bg-primary-900 dark:active:bg-primary-700 dark:group-focus-visible:bg-primary-900',
      '[&.selected]:bg-primary-50 [&.selected]:hover:bg-primary-100 [&.selected]:focus-visible:bg-primary-100',
      'dark:[&.selected]:bg-primary-700 dark:[&.selected]:hover:bg-primary-900 dark:[&.selected]:focus-visible:bg-primary-900',
    ),
    secondary: cn(
      'border-transparent bg-transparent text-secondary-800 dark:text-secondary-100',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 active:bg-secondary-100 group-focus-visible:bg-secondary-200',
      'dark:hover:bg-secondary-900 dark:focus-visible:bg-secondary-900 dark:active:bg-secondary-700 dark:group-focus-visible:bg-secondary-900',
      '[&.selected]:bg-secondary-100 [&.selected]:hover:bg-secondary-200 [&.selected]:focus-visible:bg-secondary-200',
      'dark:[&.selected]:bg-secondary-700 dark:[&.selected]:hover:bg-secondary-900 dark:[&.selected]:focus-visible:bg-secondary-900',
    ),
    terciary: cn(
      'border-transparent bg-transparent text-terciary-800 dark:text-terciary-100',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 active:bg-terciary-100 group-focus-visible:bg-terciary-200',
      'dark:hover:bg-terciary-900 dark:focus-visible:bg-terciary-900 dark:active:bg-terciary-700 dark:group-focus-visible:bg-terciary-900',
      '[&.selected]:bg-terciary-100 [&.selected]:hover:bg-terciary-200 [&.selected]:focus-visible:bg-terciary-200',
      'dark:[&.selected]:bg-terciary-700 dark:[&.selected]:hover:bg-terciary-900 dark:[&.selected]:focus-visible:bg-terciary-900',
    ),
    error: cn(
      'border-transparent bg-transparent text-error-800 dark:text-error-100',
      'hover:bg-error-200 focus-visible:bg-error-200 active:bg-error-100 group-focus-visible:bg-error-200',
      'dark:hover:bg-error-900 dark:focus-visible:bg-error-900 dark:active:bg-error-700 dark:group-focus-visible:bg-error-900',
      '[&.selected]:bg-error-100 [&.selected]:hover:bg-error-200 [&.selected]:focus-visible:bg-error-200',
      'dark:[&.selected]:bg-error-700 dark:[&.selected]:hover:bg-error-900 dark:[&.selected]:focus-visible:bg-error-900',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border-primary-800 bg-transparent text-primary-800 dark:border-primary-100 dark:border-primary-100 dark:text-primary-100',
      'hover:bg-primary-100 focus-visible:bg-primary-100 active:bg-primary-50 group-focus-visible:bg-primary-100',
      'dark:hover:bg-primary-900 dark:focus-visible:bg-primary-900 dark:active:bg-primary-700 dark:group-focus-visible:bg-primary-900',
      '[&.selected]:bg-primary-50 [&.selected]:hover:bg-primary-100 [&.selected]:focus-visible:bg-primary-100',
      'dark:[&.selected]:bg-primary-700 dark:[&.selected]:hover:bg-primary-900 dark:[&.selected]:focus-visible:bg-primary-900',
    ),
    secondary: cn(
      'border-secondary-800 bg-transparent text-secondary-800 dark:border-secondary-100 dark:border-secondary-100 dark:text-secondary-100',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 active:bg-secondary-100 group-focus-visible:bg-secondary-200',
      'dark:hover:bg-secondary-900 dark:focus-visible:bg-secondary-900 dark:active:bg-secondary-700 dark:group-focus-visible:bg-secondary-900',
      '[&.selected]:bg-secondary-100 [&.selected]:hover:bg-secondary-200 [&.selected]:focus-visible:bg-secondary-200',
      'dark:[&.selected]:bg-secondary-700 dark:[&.selected]:hover:bg-secondary-900 dark:[&.selected]:focus-visible:bg-secondary-900',
    ),
    terciary: cn(
      'border-terciary-800 bg-transparent text-terciary-800 dark:border-terciary-100 dark:border-terciary-100 dark:text-terciary-100',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 active:bg-terciary-100 group-focus-visible:bg-terciary-200',
      'dark:hover:bg-terciary-900 dark:focus-visible:bg-terciary-900 dark:active:bg-terciary-700 dark:group-focus-visible:bg-terciary-900',
      '[&.selected]:bg-terciary-100 [&.selected]:hover:bg-terciary-200 [&.selected]:focus-visible:bg-terciary-200',
      'dark:[&.selected]:bg-terciary-700 dark:[&.selected]:hover:bg-terciary-900 dark:[&.selected]:focus-visible:bg-terciary-900',
    ),
    error: cn(
      'border-error-800 bg-transparent text-error-800 dark:border-error-100 dark:border-error-100 dark:text-error-100',
      'hover:bg-error-200 focus-visible:bg-error-200 active:bg-error-100 group-focus-visible:bg-error-200',
      'dark:hover:bg-error-900 dark:focus-visible:bg-error-900 dark:active:bg-error-700 dark:group-focus-visible:bg-error-900',
      '[&.selected]:bg-error-100 [&.selected]:hover:bg-error-200 [&.selected]:focus-visible:bg-error-200',
      'dark:[&.selected]:bg-error-700 dark:[&.selected]:hover:bg-error-900 dark:[&.selected]:focus-visible:bg-error-900',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'border-primary-800 bg-primary-800 text-primary-100',
      'hover:border-primary-900 hover:bg-primary-900 focus-visible:border-primary-900 focus-visible:bg-primary-900 active:bg-primary-700 group-focus-visible:bg-primary-900',
      '[&.selected]:bg-primary-700 [&.selected]:hover:bg-primary-900 [&.selected]:focus-visible:bg-primary-900',
    ),
    secondary: cn(
      'border-secondary-800 bg-secondary-800 text-secondary-100',
      'hover:border-secondary-900 hover:bg-secondary-900 focus-visible:border-secondary-900 focus-visible:bg-secondary-900 active:bg-secondary-700 group-focus-visible:bg-secondary-900',
      '[&.selected]:bg-secondary-700 [&.selected]:hover:bg-secondary-900 [&.selected]:focus-visible:bg-secondary-900',
    ),
    terciary: cn(
      'border-terciary-800 bg-terciary-800 text-terciary-100',
      'hover:border-terciary-900 hover:bg-terciary-900 focus-visible:border-terciary-900 focus-visible:bg-terciary-900 active:bg-terciary-700 group-focus-visible:bg-terciary-900',
      '[&.selected]:bg-terciary-700 [&.selected]:hover:bg-terciary-900 [&.selected]:focus-visible:bg-terciary-900',
    ),
    error: cn(
      'border-error-800 bg-error-800 text-error-100',
      'hover:border-error-900 hover:bg-error-900 focus-visible:border-error-900 focus-visible:bg-error-900 active:bg-error-700 group-focus-visible:bg-error-900',
      '[&.selected]:bg-error-700 [&.selected]:hover:bg-error-900 [&.selected]:focus-visible:bg-error-900',
    ),
    none: '',
  },
}

export const buttonFocusWithinVariant = {
  text: {
    primary: 'focus-within:bg-primary-100 dark:focus-within:bg-primary-900',
    secondary: 'focus-within:bg-secondary-200 dark:focus-within:bg-secondary-900',
    terciary: 'focus-within:bg-terciary-200 dark:focus-within:bg-terciary-900',
    error: 'focus-within:bg-error-200 dark:focus-within:bg-error-900',
    none: '',
  },
  outlined: {
    primary: 'focus-within:bg-primary-100 dark:focus-within:bg-primary-900',
    secondary: 'focus-within:bg-secondary-200 dark:focus-within:bg-secondary-900',
    terciary: 'focus-within:bg-terciary-200 dark:focus-within:bg-terciary-900',
    error: 'focus-within:bg-error-200 dark:focus-within:bg-error-900',
    none: '',
  },
  contained: {
    primary: 'focus-within:border-primary-900 focus-within:bg-primary-900',
    secondary: 'focus-within:border-secondary-900 focus-within:bg-secondary-900',
    terciary: 'focus-within:border-terciary-900 focus-within:bg-terciary-900',
    error: 'focus-within:border-error-900 focus-within:bg-error-900',
    none: '',
  },
}

export const buttonDisabledVariant = {
  text: cn(
    'disabled:cursor-not-allowed disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
    'dark:disabled:bg-dark-200 dark:disabled:text-dark-500 dark:disabled:opacity-50',
  ),
  outlined: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
    'dark:disabled:border-dark-500 dark:disabled:bg-dark-200 dark:disabled:text-dark-500 dark:disabled:opacity-50',
  ),
  contained: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-300 disabled:opacity-50 disabled:shadow-none',
  ),
}

export const iconOnlySize = {
  sm: cn('p-smPY text-sm '),
  md: cn('p-mdPY text-base'),
  lg: cn('p-lgPY text-lg'),
  inline: cn('border-0 px-1'),
  none: '',
}

export const buttonSize = {
  sm: cn('px-smPX py-smPY text-sm'),
  md: cn('px-mdPX py-mdPY text-base'),
  lg: cn('px-lgPX py-lgPY text-lg'),
  inline: cn('border-0 px-1 hover:underline focus-visible:underline'),
  none: '',
}

export const buttonIconSize = {
  sm: cn('[&_svg]:h-smIcon [&_svg]:w-smIcon [&_svg]:min-w-smIcon'),
  md: cn('[&_svg]:h-mdIcon [&_svg]:w-mdIcon [&_svg]:min-w-mdIcon'),
  lg: cn('[&_svg]:h-lgIcon [&_svg]:w-lgIcon [&_svg]:min-w-lgIcon'),
  inline: cn('[&_svg]:h-sm [&_svg]:w-sm [&_svg]:min-w-sm'),
  none: '',
}
