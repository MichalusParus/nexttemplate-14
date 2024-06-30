import { cn } from '@/utils/utils'

export const inputClass = cn(
  'w-full appearance-none rounded-md border font-semibold transition-activity',
  'placeholder:text-dark-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden',
)

export const inputVariant = {
  text: {
    primary: cn(
      'border-transparent bg-transparent text-primary-800',
      'focus-within:bg-primary-100 hover:bg-primary-200 active:bg-primary-100 [&.selected]:bg-primary-100',
    ),
    secondary: cn(
      'border-transparent bg-transparent text-secondary-800',
      'focus-within:bg-secondary-100 hover:bg-secondary-200 active:bg-secondary-100 [&.selected]:bg-secondary-100',
    ),
    terciary: cn(
      'border-transparent bg-transparent text-terciary-800',
      'focus-within:bg-terciary-100 hover:bg-terciary-200 active:bg-terciary-100 [&.selected]:bg-terciary-100',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border-primary-800 bg-transparent text-primary-800',
      'focus-within:bg-primary-100 hover:bg-primary-200 active:bg-primary-100 [&.selected]:bg-primary-100',
    ),
    secondary: cn(
      'border-secondary-800 bg-transparent text-secondary-800',
      'focus-within:bg-secondary-100 hover:bg-secondary-200 active:bg-secondary-100 [&.selected]:bg-secondary-100',
    ),
    terciary: cn(
      'border-terciary-800 bg-transparent text-terciary-800',
      'focus-within:bg-terciary-100 hover:bg-terciary-200 active:bg-terciary-100 [&.selected]:bg-terciary-100',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'border-primary-800 bg-primary-800 text-primary-50',
      'focus-within:bg-primary-700 hover:border-primary-900 hover:bg-primary-900 active:bg-primary-700 [&.selected]:bg-primary-700',
    ),
    secondary: cn(
      'border-secondary-800 bg-secondary-800 text-secondary-50',
      'focus-within:bg-secondary-700 hover:border-secondary-900 hover:bg-secondary-900 active:bg-secondary-700 [&.selected]:bg-secondary-700',
    ),
    terciary: cn(
      'border-terciary-800 bg-terciary-800 text-terciary-50',
      'focus-within:bg-terciary-700 hover:border-terciary-900 hover:bg-terciary-900 active:bg-terciary-700 [&.selected]:bg-terciary-700',
    ),
    none: '',
  },
}

export const disabledVariant = {
  text: cn(
    'disabled:cursor-not-allowed disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  ),
  outlined: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  ),
  contained: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-300 disabled:opacity-50',
  ),
}

export const inputSize = {
  sm: cn('px-smPX py-smPY text-sm'),
  md: cn('px-mdPX py-mdPY text-base'),
  lg: cn('px-lgPX py-lgPY text-lg'),
  none: '',
}

export const inputIconPosition = cn(
  'absolute absolute top-1/2 top-1/2 -translate-y-1/2 -translate-y-1/2',
)
