import { cn } from '@/utils/utils'

export const inputClass = cn(
  'shrink-0 cursor-pointer appearance-none rounded-md transition-activity focus:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50 [&.disabled]:cursor-not-allowed [&.disabled]:opacity-50',
)

export const switchClass = cn(
  'cursor-pointer appearance-none rounded-3xl transition-activity focus:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50 [&.disabled]:cursor-not-allowed [&.disabled]:opacity-50',
)

export const checkClass = cn('absolute left-0 top-0 z-10 cursor-pointer transition-opacity')

export const thumbClass = cn('absolute rounded-full transition-position')

export const checkboxVariant = {
  text: {
    primary: cn(
      'border border-transparent',
      'hover:bg-primary-100 focus-visible:bg-primary-100 group-hover:bg-primary-100 group-focus-visible:bg-primary-100',
      'dark:hover:bg-primary-900 dark:focus-visible:bg-primary-900 dark:group-hover:bg-primary-900 dark:group-focus-visible:bg-primary-900',
      'checked:bg-primary-50 active:bg-primary-50 [&.selected]:bg-primary-50 ',
      'dark:checked:bg-primary-700 dark:active:bg-primary-700 dark:[&.selected]:bg-primary-700',
    ),
    secondary: cn(
      'border border-transparent',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 group-hover:bg-secondary-200 group-focus-visible:bg-secondary-200',
      'dark:hover:bg-secondary-900 dark:focus-visible:bg-secondary-900 dark:group-hover:bg-secondary-900 dark:group-focus-visible:bg-secondary-900',
      'checked:bg-secondary-100 active:bg-secondary-100 [&.selected]:bg-secondary-100',
      'dark:checked:bg-secondary-700 dark:active:bg-secondary-700 dark:[&.selected]:bg-secondary-700',
    ),
    terciary: cn(
      'border border-transparent',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 group-hover:bg-terciary-200 group-focus-visible:bg-terciary-200',
      'dark:hover:bg-terciary-900 dark:focus-visible:bg-terciary-900 dark:group-hover:bg-terciary-900 dark:group-focus-visible:bg-terciary-900',
      'checked:bg-terciary-100 active:bg-terciary-100 [&.selected]:bg-terciary-100 ',
      'dark:checked:bg-terciary-700 dark:active:bg-terciary-700 dark:[&.selected]:bg-terciary-700',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'border border-primary-800 dark:border-primary-100',
      'hover:bg-primary-100 focus-visible:bg-primary-100 group-hover:bg-primary-100 group-focus-visible:bg-primary-100',
      'dark:hover:bg-primary-900 dark:focus-visible:bg-primary-900 dark:group-hover:bg-primary-900 dark:group-focus-visible:bg-primary-900',
      'checked:bg-primary-50 active:bg-primary-50 [&.selected]:bg-primary-50',
      'dark:checked:bg-primary-700 dark:active:bg-primary-700 dark:[&.selected]:bg-primary-700',
    ),
    secondary: cn(
      'border border-secondary-800 dark:border-secondary-100',
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 group-hover:bg-secondary-200 group-focus-visible:bg-secondary-200',
      'dark:hover:bg-secondary-900 dark:focus-visible:bg-secondary-900 dark:group-hover:bg-secondary-900 dark:group-focus-visible:bg-secondary-900',
      'checked:bg-secondary-100 active:bg-secondary-100 [&.selected]:bg-secondary-100',
      'dark:checked:bg-secondary-700 dark:active:bg-secondary-700 dark:[&.selected]:bg-secondary-700',
    ),
    terciary: cn(
      'border border-terciary-800 dark:border-terciary-100',
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 group-hover:bg-terciary-200 group-focus-visible:bg-terciary-200',
      'dark:hover:bg-terciary-900 dark:focus-visible:bg-terciary-900 dark:group-hover:bg-terciary-900 dark:group-focus-visible:bg-terciary-900',
      'checked:bg-terciary-100 active:bg-terciary-100 [&.selected]:bg-terciary-100',
      'dark:checked:bg-terciary-700 dark:active:bg-terciary-700 dark:[&.selected]:bg-terciary-700',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'border border-primary-100 bg-primary-800',
      'hover:bg-primary-900 focus-visible:bg-primary-900 group-hover:bg-primary-900 group-focus-visible:bg-primary-900',
      'checked:bg-primary-700 active:bg-primary-700 [&.selected]:bg-primary-700',
    ),
    secondary: cn(
      'border border-secondary-100 bg-secondary-800',
      'hover:bg-secondary-900 focus-visible:bg-secondary-900 group-hover:bg-secondary-900 group-focus-visible:bg-secondary-900',
      'checked:bg-secondary-700 active:bg-secondary-700 [&.selected]:bg-secondary-700',
    ),
    terciary: cn(
      'border border-terciary-100 bg-terciary-800',
      'hover:bg-terciary-900 focus-visible:bg-terciary-900 group-hover:bg-terciary-900 group-focus-visible:bg-terciary-900',
      'checked:bg-terciary-700 active:bg-terciary-700 [&.selected]:bg-terciary-700',
    ),
    none: '',
  },
  switch: {
    primary: cn(
      'border border-primary-900 bg-primary-400 checked:bg-primary-700 active:bg-primary-700',
    ),
    secondary: cn(
      'border border-secondary-900 bg-secondary-400 checked:bg-secondary-700 active:bg-secondary-700',
    ),
    terciary: cn(
      'border border-terciary-900 bg-terciary-400 checked:bg-terciary-700 active:bg-terciary-700',
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
  switch: {
    primary: cn(
      'border border-primary-900 bg-primary-800 group-focus-within:bg-primary-900 group-hover:bg-primary-900',
      '[&.disabled]:cursor-not-allowed [&.disabled]:border-dark-400 [&.disabled]:bg-dark-400 [&.disabled]:opacity-50 [&.disabled]:group-hover:bg-dark-400',
    ),
    secondary: cn(
      'border border-secondary-900 bg-secondary-800 group-focus-within:bg-secondary-900 group-hover:bg-secondary-900',
      '[&.disabled]:cursor-not-allowed [&.disabled]:border-dark-400 [&.disabled]:bg-dark-400 [&.disabled]:opacity-50 [&.disabled]:group-hover:bg-dark-400',
    ),
    terciary: cn(
      'border border-terciary-900 bg-terciary-800 group-focus-within:bg-terciary-900 group-hover:bg-terciary-900',
      '[&.disabled]:cursor-not-allowed [&.disabled]:border-dark-400 [&.disabled]:bg-dark-400 [&.disabled]:opacity-50 [&.disabled]:group-hover:bg-dark-400',
    ),
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

export const switchSize = {
  sm: cn(
    'text-sm [&>.SwitchThumb]:h-smIcon [&>.SwitchThumb]:w-smIcon [&>input]:h-smIcon [&>input]:w-8 ',
  ),
  md: cn(
    'text-base [&>.SwitchThumb]:h-mdIcon [&>.SwitchThumb]:w-mdIcon [&>input]:h-mdIcon [&>input]:w-10 ',
  ),
  lg: cn(
    'text-lg [&>.SwitchThumb]:h-lgIcon [&>.SwitchThumb]:w-lgIcon [&>input]:h-lgIcon [&>input]:w-12 ',
  ),
  none: '',
}

export const checkboxMargin = {
  sm: cn('mb-1 mr-3'),
  md: cn('mb-2 mr-4'),
  lg: cn('mb-3 mr-5'),
  none: '',
}

export const switchLeft = {
  sm: cn('left-3'),
  md: cn('left-4'),
  lg: cn('left-5'),
  none: '',
}

export const disabledVariant = {
  text: cn(
    'disabled:border-transparent disabled:bg-dark-200 [&.disabled]:border-transparent [&.disabled]:bg-dark-300',
    'dark:disabled:bg-dark-200 dark:disabled:text-dark-500 dark:disabled:opacity-50',
  ),
  outlined: cn(
    'disabled:border-dark-500 disabled:bg-dark-200 [&.disabled]:border-dark-400 [&.disabled]:bg-dark-300',
    'dark:disabled:border-dark-500 dark:disabled:bg-dark-200 dark:disabled:text-dark-500 dark:disabled:opacity-50',
  ),
  contained: cn(
    'disabled:border-dark-500 disabled:bg-dark-500 [&.disabled]:border-dark-400 [&.disabled]:bg-dark-400',
    'dark:disabled:border-dark-500 dark:disabled:bg-dark-500 dark:disabled:text-dark-500 dark:disabled:opacity-50',
  ),
  switch: cn(
    'disabled:border-dark-500 disabled:bg-dark-200 [&.disabled]:border-dark-400 [&.disabled]:bg-dark-300',
  ),
}
