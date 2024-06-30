import { cn } from '@/utils/utils'

export const buttonClass = cn(
  'relative rounded-md border transition-activity focus:outline-none [&.error]:shadow-error',
)

export const buttonVariant = {
  text: {
    primary: cn(
      'border-transparent bg-transparent text-primary-800',
      'hover:bg-primary-200 focus-visible:bg-primary-200 active:bg-primary-100',
      '[&.selected]:bg-primary-100 [&.selected]:hover:bg-primary-200 [&.selected]:focus-visible:bg-primary-200',
    ),
    secondary: cn(
      'border-transparent bg-transparent text-secondary-800',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 active:bg-secondary-100',
      '[&.selected]:bg-secondary-100 [&.selected]:hover:bg-secondary-200 [&.selected]:focus-visible:bg-secondary-200',
    ),
    terciary: cn(
      'border-transparent bg-transparent text-terciary-800',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 active:bg-terciary-100',
      '[&.selected]:bg-terciary-100 [&.selected]:hover:bg-terciary-200 [&.selected]:focus-visible:bg-terciary-200',
    ),
    error: cn(
      'border-transparent bg-transparent text-error-800',
      'hover:bg-error-200 focus-visible:bg-error-200 active:bg-error-100',
      '[&.selected]:bg-error-100 [&.selected]:hover:bg-error-200 [&.selected]:focus-visible:bg-error-200',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border-primary-800 bg-transparent text-primary-800',
      'hover:bg-primary-200 focus-visible:bg-primary-200 active:bg-primary-100',
      '[&.selected]:bg-primary-100 [&.selected]:hover:bg-primary-200 [&.selected]:focus-visible:bg-primary-200',
    ),
    secondary: cn(
      'border-secondary-800 bg-transparent text-secondary-800',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 active:bg-secondary-100',
      '[&.selected]:bg-secondary-100 [&.selected]:hover:bg-secondary-200 [&.selected]:focus-visible:bg-secondary-200',
    ),
    terciary: cn(
      'border-terciary-800 bg-transparent text-terciary-800',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 active:bg-terciary-100',
      '[&.selected]:bg-terciary-100 [&.selected]:hover:bg-terciary-200 [&.selected]:focus-visible:bg-terciary-200',
    ),
    error: cn(
      'border-error-800 bg-transparent text-error-800',
      'hover:bg-error-200 focus-visible:bg-error-200 active:bg-error-100',
      '[&.selected]:bg-error-100 [&.selected]:hover:bg-error-200 [&.selected]:focus-visible:bg-error-200',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'border-primary-800 bg-primary-800 text-primary-50',
      'hover:border-primary-900 hover:bg-primary-900 focus-visible:border-primary-900 focus-visible:bg-primary-900 active:bg-primary-700',
      '[&.selected]:bg-primary-700 [&.selected]:hover:bg-primary-900 [&.selected]:focus-visible:bg-primary-900',
    ),
    secondary: cn(
      'border-secondary-800 bg-secondary-800 text-secondary-50',
      'hover:border-secondary-900 hover:bg-secondary-900 focus-visible:border-secondary-900 focus-visible:bg-secondary-900 active:bg-secondary-700',
      '[&.selected]:bg-secondary-700 [&.selected]:hover:bg-secondary-900 [&.selected]:focus-visible:bg-secondary-900',
    ),
    terciary: cn(
      'border-terciary-800 bg-terciary-800 text-terciary-50',
      'hover:border-terciary-900 hover:bg-terciary-900 focus-visible:border-terciary-900 focus-visible:bg-terciary-900 active:bg-terciary-700',
      '[&.selected]:bg-terciary-700 [&.selected]:hover:bg-terciary-900 [&.selected]:focus-visible:bg-terciary-900',
    ),
    error: cn(
      'border-error-800 bg-error-800 text-error-50',
      'hover:border-error-900 hover:bg-error-900 focus-visible:border-error-900 focus-visible:bg-error-900 active:bg-error-700',
      '[&.selected]:bg-error-700 [&.selected]:hover:bg-error-900 [&.selected]:focus-visible:bg-error-900',
    ),
    none: '',
  },
}

export const buttonDisabledVariant = {
  text: cn(
    'disabled:cursor-not-allowed disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  ),
  outlined: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  ),
  contained: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-300 disabled:opacity-50 disabled:shadow-none',
  ),
}

export const iconOnlySize = {
  sm: cn('p-smPY text-sm '),
  md: cn('text-md p-mdPY'),
  lg: cn('p-lgPY text-lg'),
  inline: cn('border-0 px-1'),
  none: '',
}

export const buttonContentSize = {
  sm: cn('px-smPX py-smPY text-sm'),
  md: cn('px-mdPX py-mdPY text-base'),
  lg: cn('px-lgPX py-lgPY text-lg'),
  inline: cn('border-0 px-1'),
  none: '',
}

export const buttonIconSize = {
  sm: cn('[&_svg]:h-smIcon [&_svg]:w-smIcon [&_svg]:min-w-smIcon'),
  md: cn('[&_svg]:h-mdIcon [&_svg]:w-mdIcon [&_svg]:min-w-mdIcon'),
  lg: cn('[&_svg]:h-lgIcon [&_svg]:w-lgIcon [&_svg]:min-w-lgIcon'),
  inline: cn('[&_svg]:h-sm [&_svg]:w-sm [&_svg]:min-w-sm'),
  none: '',
}

export const innerWrapClass = cn(
  'flex w-full items-center justify-center whitespace-nowrap font-semibold',
)
