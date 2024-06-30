import { cn } from '@/utils/utils'

export const radioClass = cn(
  'relative mr-2 cursor-pointer appearance-none rounded-full transition-activity focus:outline-none',
)

export const radioVariant = {
  text: {
    primary: cn(
      'border border-transparent bg-transparent after:bg-primary-800',
      'hover:bg-primary-200 focus-visible:bg-primary-200',
      'checked:bg-primary-100 active:bg-primary-100',
    ),
    secondary: cn(
      'border border-transparent bg-transparent after:bg-secondary-800',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200',
      'checked:bg-secondary-100 active:bg-secondary-100',
    ),
    terciary: cn(
      'border border-transparent bg-transparent after:bg-terciary-800',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200',
      'checked:bg-terciary-100 active:bg-terciary-100',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border border-primary-800 bg-transparent after:bg-primary-800',
      'hover:bg-primary-200 focus-visible:bg-primary-200',
      'checked:bg-primary-100 active:bg-primary-100',
    ),
    secondary: cn(
      'border border-secondary-800 bg-transparent after:bg-secondary-800',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200',
      'checked:bg-secondary-100 active:bg-secondary-100',
    ),
    terciary: cn(
      'border border-terciary-800 bg-transparent after:bg-terciary-800',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200',
      'checked:bg-terciary-100 active:bg-terciary-100',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'border border-primary-900 bg-primary-800 after:bg-primary-50',
      'hover:bg-primary-900 focus-visible:bg-primary-900',
      'checked:bg-primary-700 active:bg-primary-700',
    ),
    secondary: cn(
      'border border-secondary-900 bg-secondary-800 after:bg-secondary-50',
      'hover:bg-secondary-900 focus-visible:bg-secondary-900',
      'checked:bg-secondary-700 active:bg-secondary-700',
    ),
    terciary: cn(
      'border border-terciary-900 bg-terciary-800 after:bg-terciary-50',
      'hover:bg-terciary-900 focus-visible:bg-terciary-900',
      'checked:bg-terciary-700 active:bg-terciary-700',
    ),
    none: '',
  },
}

export const afterClass = cn(
  'after:invisible after:absolute after:left-[50%] after:top-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full',
  'after:opacity-0 after:transition-opacity after:content-[""] checked:after:visible checked:after:opacity-100 disabled:after:bg-dark-500',
)

export const disableVariant = {
  text: cn(
    'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  ),
  outlined: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  ),
  contained: cn(
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-500 disabled:opacity-50',
  ),
}

export const radioSize = {
  sm: cn(
    'mb-1 mr-3 text-sm [&_input]:h-smIcon [&_input]:w-smIcon [&_input]:after:h-2 [&_input]:after:w-2',
  ),
  md: cn(
    'mb-2 mr-4 text-base [&_input]:h-mdIcon [&_input]:w-mdIcon [&_input]:after:h-2.5 [&_input]:after:w-2.5',
  ),
  lg: cn(
    'mb-3 mr-5 text-lg [&_input]:h-lgIcon [&_input]:w-lgIcon [&_input]:after:h-3 [&_input]:after:w-3',
  ),
  none: '',
}
