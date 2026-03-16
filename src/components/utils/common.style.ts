import { cn } from '@/utils/utils'

// TYPOGRAPHY

export const textVariant = {
  text: {
    primary: cn('text-primary-800 dark:text-primary-100'),
    secondary: cn('text-secondary-800 dark:text-secondary-100'),
    terciary: cn('text-terciary-800 dark:text-terciary-100'),
    none: '',
  },
  outlined: {
    primary: cn('text-primary-800 dark:text-primary-100'),
    secondary: cn('text-secondary-800 dark:text-secondary-100'),
    terciary: cn('text-terciary-800 dark:text-terciary-100'),
    none: '',
  },
  contained: {
    primary: cn('text-primary-100'),
    secondary: cn('text-secondary-100'),
    terciary: cn('text-terciary-100'),
    none: '',
  },
}

export const textSize = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  none: '',
}

export const errorStateClass = cn(
  '[&.error]:border-error-800 [&.error]:shadow-error',
  'dark:[&.error]:border-error-800',
)


//  SIZES

export const paddingSize = {
  sm: 'py-sm-y px-sm-x',
  md: 'px-md-x py-md-y',
  lg: 'py-lg-y px-lg-x',
  none: '',
}

export const iconPaddingSize = {
  sm: 'p-sm-y',
  md: 'p-md-y',
  lg: 'p-lg-y',
  inline: 'p-0',
  none: '',
}

export const childrenIconSize = {
  sm: '[&_svg]:h-sm-icon [&_svg]:w-sm-icon [&_svg]:min-w-sm-icon',
  md: '[&_svg]:h-md-icon [&_svg]:w-md-icon [&_svg]:min-w-md-icon',
  lg: '[&_svg]:h-lg-icon [&_svg]:w-lg-icon [&_svg]:min-w-lg-icon',
  inline: '[&_svg]:h-sm [&_svg]:w-sm [&_svg]:min-w-sm',
  none: '',
}


// STYLES

export const paperVariant = {
  text: {
    primary: 'border-transparent bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-primary-800 dark:text-primary-100',
    secondary: 'border-transparent bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-secondary-800 dark:text-secondary-100',
    terciary: 'border-transparent bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-terciary-800 dark:text-terciary-100',
    error: 'border-transparent bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-error-800 dark:text-error-100',
    none: '',
  },
  outlined: {
    primary: 'border-primary-800 dark:border-primary-100 bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-primary-800 dark:text-primary-100',
    secondary: 'border-secondary-800 dark:border-secondary-100 bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-secondary-800 dark:text-secondary-100',
    terciary: 'border-terciary-800 dark:border-terciary-100 bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-terciary-800 dark:text-terciary-100',
    error: 'border-error-800 dark:border-error-100 bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg text-error-800 dark:text-error-100',
    none: '',
  },
  contained: {
    primary: 'border-primary-800 bg-primary-700 from-primary-700 text-primary-50',
    secondary: 'border-secondary-800 bg-secondary-700 from-secondary-700 text-secondary-50',
    terciary: 'border-terciary-800 bg-terciary-700 from-terciary-700 text-terciary-50',
    error: 'border-error-800 bg-error-700 from-error-700 text-error-50',
    none: '',
  },
}

export const toggleBaseBg = 'bg-dark-500/10 dark:bg-dark-950/20'

export const interactiveVariant = {
  text: {
    primary: cn(
      'hover:bg-primary-100 dark:hover:bg-primary-900',
      'active:bg-primary-200 dark:active:bg-primary-800',
      '[&.selected]:bg-primary-100 dark:[&.selected]:bg-primary-900',
      '[&.selected]:hover:bg-primary-200 dark:[&.selected]:hover:bg-primary-800',
      '[&.selected]:active:bg-primary-300 dark:[&.selected]:active:bg-primary-700',
    ),
    secondary: cn(
      'hover:bg-secondary-100 dark:hover:bg-secondary-900',
      'active:bg-secondary-200 dark:active:bg-secondary-800',
      '[&.selected]:bg-secondary-100 dark:[&.selected]:bg-secondary-900',
      '[&.selected]:hover:bg-secondary-200 dark:[&.selected]:hover:bg-secondary-800',
      '[&.selected]:active:bg-secondary-300 dark:[&.selected]:active:bg-secondary-700',
    ),
    terciary: cn(
      'hover:bg-terciary-100 dark:hover:bg-terciary-900',
      'active:bg-terciary-200 dark:active:bg-terciary-800',
      '[&.selected]:bg-terciary-100 dark:[&.selected]:bg-terciary-900',
      '[&.selected]:hover:bg-terciary-200 dark:[&.selected]:hover:bg-terciary-800',
      '[&.selected]:active:bg-terciary-300 dark:[&.selected]:active:bg-terciary-700',
    ),
    error: cn(
      'hover:bg-error-100 dark:hover:bg-error-900',
      'active:bg-error-200 dark:active:bg-error-800',
      '[&.selected]:bg-error-100 dark:[&.selected]:bg-error-900',
      '[&.selected]:hover:bg-error-200 dark:[&.selected]:hover:bg-error-800',
      '[&.selected]:active:bg-error-300 dark:[&.selected]:active:bg-error-700',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'hover:bg-primary-100 dark:hover:bg-primary-900',
      'active:bg-primary-200 dark:active:bg-primary-800',
      '[&.selected]:bg-primary-100 dark:[&.selected]:bg-primary-900',
      '[&.selected]:hover:bg-primary-200 dark:[&.selected]:hover:bg-primary-800',
      '[&.selected]:active:bg-primary-300 dark:[&.selected]:active:bg-primary-700',
    ),
    secondary: cn(
      'hover:bg-secondary-100 dark:hover:bg-secondary-900',
      'active:bg-secondary-200 dark:active:bg-secondary-800',
      '[&.selected]:bg-secondary-100 dark:[&.selected]:bg-secondary-900',
      '[&.selected]:hover:bg-secondary-200 dark:[&.selected]:hover:bg-secondary-800',
      '[&.selected]:active:bg-secondary-300 dark:[&.selected]:active:bg-secondary-700',
    ),
    terciary: cn(
      'hover:bg-terciary-100 dark:hover:bg-terciary-900',
      'active:bg-terciary-200 dark:active:bg-terciary-800',
      '[&.selected]:bg-terciary-100 dark:[&.selected]:bg-terciary-900',
      '[&.selected]:hover:bg-terciary-200 dark:[&.selected]:hover:bg-terciary-800',
      '[&.selected]:active:bg-terciary-300 dark:[&.selected]:active:bg-terciary-700',
    ),
    error: cn(
      'hover:bg-error-100 dark:hover:bg-error-900',
      'active:bg-error-200 dark:active:bg-error-800',
      '[&.selected]:bg-error-100 dark:[&.selected]:bg-error-900',
      '[&.selected]:hover:bg-error-200 dark:[&.selected]:hover:bg-error-800',
      '[&.selected]:active:bg-error-300 dark:[&.selected]:active:bg-error-700',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'hover:bg-primary-800 active:bg-primary-900',
      '[&.selected]:bg-primary-800 [&.selected]:hover:bg-primary-900 [&.selected]:active:bg-primary-950',
    ),
    secondary: cn(
      'hover:bg-secondary-800 active:bg-secondary-900',
      '[&.selected]:bg-secondary-800 [&.selected]:hover:bg-secondary-900 [&.selected]:active:bg-secondary-950',
    ),
    terciary: cn(
      'hover:bg-terciary-800 active:bg-terciary-900',
      '[&.selected]:bg-terciary-800 [&.selected]:hover:bg-terciary-900 [&.selected]:active:bg-terciary-950',
    ),
    error: cn(
      'hover:bg-error-800 active:bg-error-900',
      '[&.selected]:bg-error-800 [&.selected]:hover:bg-error-900 [&.selected]:active:bg-error-950',
    ),
    none: '',
  },
}


// DISABLED

export const disabledVariant = {
  text: cn(
    'disabled-aria:cursor-not-allowed disabled-aria:bg-dark-200 disabled-aria:text-dark-500 disabled-aria:opacity-50 disabled-aria:shadow-none',
    'disabled-aria:hover:bg-dark-200 disabled-aria:focus-within:bg-dark-200 disabled-aria:focus-within:ring-0 disabled-aria:focus-visible:bg-dark-200 disabled-aria:focus-visible:ring-0 disabled-aria:group-hover:bg-dark-200',
    'dark:disabled-aria:bg-dark-200 dark:disabled-aria:text-dark-500',
    'dark:disabled-aria:hover:bg-dark-200 dark:disabled-aria:focus-within:bg-dark-200 dark:disabled-aria:focus-visible:bg-dark-200 dark:disabled-aria:group-hover:bg-dark-200',
  ),
  outlined: cn(
    'disabled-aria:cursor-not-allowed disabled-aria:border-dark-500 disabled-aria:bg-dark-200 disabled-aria:text-dark-500 disabled-aria:opacity-50 disabled-aria:shadow-none',
    'disabled-aria:hover:bg-dark-200 disabled-aria:focus-within:bg-dark-200 disabled-aria:focus-within:ring-0 disabled-aria:focus-visible:bg-dark-200 disabled-aria:focus-visible:ring-0 disabled-aria:group-hover:bg-dark-200',
    'dark:disabled-aria:border-dark-500 dark:disabled-aria:bg-dark-200 dark:disabled-aria:text-dark-500',
    'dark:disabled-aria:hover:bg-dark-200 dark:disabled-aria:focus-within:bg-dark-200 dark:disabled-aria:focus-visible:bg-dark-200 dark:disabled-aria:group-hover:bg-dark-200',
  ),
  contained: cn(
    'disabled-aria:cursor-not-allowed disabled-aria:border-dark-500 disabled-aria:bg-dark-500 disabled-aria:text-dark-300 disabled-aria:opacity-50 disabled-aria:shadow-none',
    'disabled-aria:hover:bg-dark-500 disabled-aria:focus-within:bg-dark-500 disabled-aria:focus-within:ring-0 disabled-aria:focus-visible:bg-dark-500 disabled-aria:focus-visible:ring-0 disabled-aria:group-hover:bg-dark-500',
  ),
}


/** FOCUS */

export const focusVisibleVariant = {
  text: {
    primary: cn(
      'focus-visible:bg-primary-100 focus-visible:ring-primary-800',
      'dark:focus-visible:bg-primary-900 dark:focus-visible:ring-primary-100',
      'group-focus-visible:bg-primary-100 dark:group-focus-visible:bg-primary-900',
      '[&.selected]:focus-visible:bg-primary-200 dark:[&.selected]:focus-visible:bg-primary-800',
    ),
    secondary: cn(
      'focus-visible:bg-secondary-100 focus-visible:ring-secondary-800',
      'dark:focus-visible:bg-secondary-900 dark:focus-visible:ring-secondary-100',
      'group-focus-visible:bg-secondary-100 dark:group-focus-visible:bg-secondary-900',
      '[&.selected]:focus-visible:bg-secondary-200 dark:[&.selected]:focus-visible:bg-secondary-800',
    ),
    terciary: cn(
      'focus-visible:bg-terciary-100 focus-visible:ring-terciary-800',
      'dark:focus-visible:bg-terciary-900 dark:focus-visible:ring-terciary-100',
      'group-focus-visible:bg-terciary-100 dark:group-focus-visible:bg-terciary-900',
      '[&.selected]:focus-visible:bg-terciary-200 dark:[&.selected]:focus-visible:bg-terciary-800',
    ),
    error: cn(
      'focus-visible:bg-error-100 focus-visible:ring-error-800',
      'dark:focus-visible:bg-error-900 dark:focus-visible:ring-error-100',
      'group-focus-visible:bg-error-100 dark:group-focus-visible:bg-error-900',
      '[&.selected]:focus-visible:bg-error-200 dark:[&.selected]:focus-visible:bg-error-800',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'focus-visible:bg-primary-100 focus-visible:ring-primary-800',
      'dark:focus-visible:bg-primary-900 dark:focus-visible:ring-primary-100',
      'group-focus-visible:bg-primary-100 dark:group-focus-visible:bg-primary-900',
      '[&.selected]:focus-visible:bg-primary-200 dark:[&.selected]:focus-visible:bg-primary-800',
    ),
    secondary: cn(
      'focus-visible:bg-secondary-100 focus-visible:ring-secondary-800',
      'dark:focus-visible:bg-secondary-900 dark:focus-visible:ring-secondary-100',
      'group-focus-visible:bg-secondary-100 dark:group-focus-visible:bg-secondary-900',
      '[&.selected]:focus-visible:bg-secondary-200 dark:[&.selected]:focus-visible:bg-secondary-800',
    ),
    terciary: cn(
      'focus-visible:bg-terciary-100 focus-visible:ring-terciary-800',
      'dark:focus-visible:bg-terciary-900 dark:focus-visible:ring-terciary-100',
      'group-focus-visible:bg-terciary-100 dark:group-focus-visible:bg-terciary-900',
      '[&.selected]:focus-visible:bg-terciary-200 dark:[&.selected]:focus-visible:bg-terciary-800',
    ),
    error: cn(
      'focus-visible:bg-error-100 focus-visible:ring-error-800',
      'dark:focus-visible:bg-error-900 dark:focus-visible:ring-error-100',
      'group-focus-visible:bg-error-100 dark:group-focus-visible:bg-error-900',
      '[&.selected]:focus-visible:bg-error-200 dark:[&.selected]:focus-visible:bg-error-800',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'focus-visible:bg-primary-800 focus-visible:ring-primary-900',
      'group-focus-visible:bg-primary-800',
      '[&.selected]:focus-visible:bg-primary-900',
    ),
    secondary: cn(
      'focus-visible:bg-secondary-800 focus-visible:ring-secondary-900',
      'group-focus-visible:bg-secondary-800',
      '[&.selected]:focus-visible:bg-secondary-900',
    ),
    terciary: cn(
      'focus-visible:bg-terciary-800 focus-visible:ring-terciary-900',
      'group-focus-visible:bg-terciary-800',
      '[&.selected]:focus-visible:bg-terciary-900',
    ),
    error: cn(
      'focus-visible:bg-error-800 focus-visible:ring-error-900',
      'group-focus-visible:bg-error-800',
      '[&.selected]:focus-visible:bg-error-900',
    ),
    none: '',
  },
}

export const focusWithinVariant = {
  text: {
    primary: cn(
      'focus-within:bg-primary-100 focus-within:ring-primary-800',
      'dark:focus-within:bg-primary-900 dark:focus-within:ring-primary-100',
      'group-focus-within:bg-primary-100 dark:group-focus-within:bg-primary-900',
      '[&.selected]:focus-within:bg-primary-200 dark:[&.selected]:focus-within:bg-primary-800',
    ),
    secondary: cn(
      'focus-within:bg-secondary-100 focus-within:ring-secondary-800',
      'dark:focus-within:bg-secondary-900 dark:focus-within:ring-secondary-100',
      'group-focus-within:bg-secondary-100 dark:group-focus-within:bg-secondary-900',
      '[&.selected]:focus-within:bg-secondary-200 dark:[&.selected]:focus-within:bg-secondary-800',
    ),
    terciary: cn(
      'focus-within:bg-terciary-100 focus-within:ring-terciary-800',
      'dark:focus-within:bg-terciary-900 dark:focus-within:ring-terciary-100',
      'group-focus-within:bg-terciary-100 dark:group-focus-within:bg-terciary-900',
      '[&.selected]:focus-within:bg-terciary-200 dark:[&.selected]:focus-within:bg-terciary-800',
    ),
    error: cn(
      'focus-within:bg-error-100 focus-within:ring-error-800',
      'dark:focus-within:bg-error-900 dark:focus-within:ring-error-100',
      'group-focus-within:bg-error-100 dark:group-focus-within:bg-error-900',
      '[&.selected]:focus-within:bg-error-200 dark:[&.selected]:focus-within:bg-error-800',
    ),
    none: '',
  },

  outlined: {
    primary: cn(
      'focus-within:bg-primary-100 focus-within:ring-primary-800',
      'dark:focus-within:bg-primary-900 dark:focus-within:ring-primary-100',
      'group-focus-within:bg-primary-100 dark:group-focus-within:bg-primary-900',
      '[&.selected]:focus-within:bg-primary-200 dark:[&.selected]:focus-within:bg-primary-800',
    ),
    secondary: cn(
      'focus-within:bg-secondary-100 focus-within:ring-secondary-800',
      'dark:focus-within:bg-secondary-900 dark:focus-within:ring-secondary-100',
      'group-focus-within:bg-secondary-100 dark:group-focus-within:bg-secondary-900',
      '[&.selected]:focus-within:bg-secondary-200 dark:[&.selected]:focus-within:bg-secondary-800',
    ),
    terciary: cn(
      'focus-within:bg-terciary-100 focus-within:ring-terciary-800',
      'dark:focus-within:bg-terciary-900 dark:focus-within:ring-terciary-100',
      'group-focus-within:bg-terciary-100 dark:group-focus-within:bg-terciary-900',
      '[&.selected]:focus-within:bg-terciary-200 dark:[&.selected]:focus-within:bg-terciary-800',
    ),
    error: cn(
      'focus-within:bg-error-100 focus-within:ring-error-800',
      'dark:focus-within:bg-error-900 dark:focus-within:ring-error-100',
      'group-focus-within:bg-error-100 dark:group-focus-within:bg-error-900',
      '[&.selected]:focus-within:bg-error-200 dark:[&.selected]:focus-within:bg-error-800',
    ),
    none: '',
  },

  contained: {
    primary: cn(
      'focus-within:bg-primary-800 focus-within:ring-primary-900',
      'group-focus-within:bg-primary-800 group-focus-within:ring-primary-900',
      '[&.selected]:focus-within:bg-primary-900',
    ),
    secondary: cn(
      'focus-within:bg-secondary-800 focus-within:ring-secondary-900',
      'group-focus-within:bg-secondary-800 group-focus-within:ring-secondary-900',
      '[&.selected]:focus-within:bg-secondary-900',
    ),
    terciary: cn(
      'focus-within:bg-terciary-800 focus-within:ring-terciary-900',
      'group-focus-within:bg-terciary-800 group-focus-within:ring-terciary-900',
      '[&.selected]:focus-within:bg-terciary-900',
    ),
    error: cn(
      'focus-within:bg-error-800 focus-within:ring-error-900',
      'group-focus-within:bg-error-800 group-focus-within:ring-error-900',
      '[&.selected]:focus-within:bg-error-900',
    ),
    none: '',
  },
}

