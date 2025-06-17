import { cn } from '@/utils/utils'

export const inputWrapClass = cn(
  'relative w-full overflow-hidden rounded-md border transition-activity',
)

export const inputClass = cn(
  'w-full appearance-none border-none bg-transparent font-semibold placeholder:text-placeholder focus:outline-none disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden',
)

export const inputVariant = {
  text: {
    primary: cn(
      'border-transparent bg-transparent text-primary-800 dark:text-primary-100',
      'focus-within:bg-primary-100 hover:bg-primary-100 active:bg-primary-50 group-focus-within:bg-primary-100',
      'dark:focus-within:bg-primary-900 dark:hover:bg-primary-900 dark:active:bg-primary-700 dark:group-focus-within:bg-primary-900',
      '[&.selected]:bg-primary-50 [&.selected]:focus-within:bg-primary-100 [&.selected]:hover:bg-primary-100',
      'dark:[&.selected]:bg-primary-700 dark:[&.selected]:focus-within:bg-primary-900 dark:[&.selected]:hover:bg-primary-900',
    ),
    secondary: cn(
      'border-transparent bg-transparent text-secondary-800 dark:text-secondary-100',
      'focus-within:bg-secondary-200 hover:bg-secondary-200 active:bg-secondary-100 group-focus-within:bg-secondary-200',
      'dark:focus-within:bg-secondary-900 dark:hover:bg-secondary-900 dark:active:bg-secondary-700 dark:group-focus-within:bg-secondary-900',
      '[&.selected]:bg-secondary-100 [&.selected]:focus-within:bg-secondary-200 [&.selected]:hover:bg-secondary-200',
      'dark:[&.selected]:bg-secondary-700 dark:[&.selected]:focus-within:bg-secondary-900 dark:[&.selected]:hover:bg-secondary-900',
    ),
    terciary: cn(
      'border-transparent bg-transparent text-terciary-800 dark:text-terciary-100',
      'focus-within:bg-terciary-200 hover:bg-terciary-200 active:bg-terciary-100 group-focus-within:bg-terciary-200',
      'dark:focus-within:bg-terciary-900 dark:hover:bg-terciary-900 dark:active:bg-terciary-700 dark:group-focus-within:bg-terciary-900',
      '[&.selected]:bg-terciary-100 [&.selected]:focus-within:bg-terciary-200 [&.selected]:hover:bg-terciary-200',
      'dark:[&.selected]:bg-terciary-700 dark:[&.selected]:focus-within:bg-terciary-900 dark:[&.selected]:hover:bg-terciary-900',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border-primary-800 bg-transparent text-primary-800 dark:border-primary-100 dark:border-primary-100 dark:text-primary-100',
      'focus-within:bg-primary-100 hover:bg-primary-100 active:bg-primary-50 group-focus-within:bg-primary-100',
      'dark:focus-within:bg-primary-900 dark:hover:bg-primary-900 dark:active:bg-primary-700 dark:group-focus-within:bg-primary-900',
      '[&.selected]:bg-primary-50 [&.selected]:focus-within:bg-primary-100 [&.selected]:hover:bg-primary-100',
      'dark:[&.selected]:bg-primary-700 dark:[&.selected]:focus-within:bg-primary-900 dark:[&.selected]:hover:bg-primary-900',
    ),
    secondary: cn(
      'border-secondary-800 bg-transparent text-secondary-800 dark:border-secondary-100 dark:border-secondary-100 dark:text-secondary-100',
      'focus-within:bg-secondary-200 hover:bg-secondary-200 active:bg-secondary-100 group-focus-within:bg-secondary-200',
      'dark:focus-within:bg-secondary-900 dark:hover:bg-secondary-900 dark:active:bg-secondary-700 dark:group-focus-within:bg-secondary-900',
      '[&.selected]:bg-secondary-100 [&.selected]:focus-within:bg-secondary-200 [&.selected]:hover:bg-secondary-200',
      'dark:[&.selected]:bg-secondary-700 dark:[&.selected]:focus-within:bg-secondary-900 dark:[&.selected]:hover:bg-secondary-900',
    ),
    terciary: cn(
      'border-terciary-800 bg-transparent text-terciary-800 dark:border-terciary-100 dark:border-terciary-100 dark:text-terciary-100',
      'focus-within:bg-terciary-200 hover:bg-terciary-200 active:bg-terciary-100 group-focus-within:bg-terciary-200',
      'dark:focus-within:bg-terciary-900 dark:hover:bg-terciary-900 dark:active:bg-terciary-700 dark:group-focus-within:bg-terciary-900',
      '[&.selected]:bg-terciary-100 [&.selected]:focus-within:bg-terciary-200 [&.selected]:hover:bg-terciary-200',
      'dark:[&.selected]:bg-terciary-700 dark:[&.selected]:focus-within:bg-terciary-900 dark:[&.selected]:hover:bg-terciary-900',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'border-primary-800 bg-primary-800 text-primary-100',
      'focus-within:border-primary-900 focus-within:bg-primary-900 hover:border-primary-900 hover:bg-primary-900 active:bg-primary-700 group-focus-within:bg-primary-900',
      '[&.selected]:bg-primary-700 [&.selected]:focus-within:bg-primary-900 [&.selected]:hover:bg-primary-900',
    ),
    secondary: cn(
      'border-secondary-800 bg-secondary-800 text-secondary-100',
      'focus-within:border-secondary-900 focus-within:bg-secondary-900 hover:border-secondary-900 hover:bg-secondary-900 active:bg-secondary-700 group-focus-within:bg-secondary-900',
      '[&.selected]:bg-secondary-700 [&.selected]:focus-within:bg-secondary-900 [&.selected]:hover:bg-secondary-900',
    ),
    terciary: cn(
      'border-terciary-800 bg-terciary-800 text-terciary-100',
      'focus-within:border-terciary-900 focus-within:bg-terciary-900 hover:border-terciary-900 hover:bg-terciary-900 active:bg-terciary-700 group-focus-within:bg-terciary-900',
      '[&.selected]:bg-terciary-700 [&.selected]:focus-within:bg-terciary-900 [&.selected]:hover:bg-terciary-900',
    ),
    none: '',
  },
}

export const disabledVariant = {
  text: cn(
    '[&.disabled]:border-transparent [&.disabled]:bg-dark-200 [&.disabled]:opacity-50 [&.disabled]:shadow-none',
    'dark:[&.disabled]:border-transparent dark:[&.disabled]:bg-dark-200 dark:[&.disabled]:text-dark-500',
  ),
  outlined: cn(
    '[&.disabled]:border-dark-500 [&.disabled]:bg-dark-200 [&.disabled]:opacity-50 [&.disabled]:shadow-none',
    'dark:[&.disabled]:border-dark-500 dark:[&.disabled]:bg-dark-200 dark:[&.disabled]:text-dark-500',
  ),
  contained: cn(
    '[&.disabled]:border-dark-500 [&.disabled]:bg-dark-500 [&.disabled]:text-dark-300 [&.disabled]:opacity-50 [&.disabled]:shadow-none',
  ),
}

export const inputErrorClass = cn(
  '[&.error]:border-error-800 [&.error]:shadow-error [&.error]:dark:border-error-800',
)

export const inputSize = {
  sm: cn('px-smPX py-smPY text-sm'),
  md: cn('px-mdPX py-mdPY text-base'),
  lg: cn('px-lgPX py-lgPY text-lg'),
  none: '',
}
