import { cn } from '@/utils/utils'

type Variant = 'text' | 'outlined' | 'contained'
type Color = 'primary' | 'secondary' | 'terciary' | 'none'
type Size = 'sm' | 'md' | 'lg' | 'none'

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
} satisfies Record<Variant, Record<Color, string>>

export const textSize = {
  sm: 'text-sm',
  md: 'text-sm md:text-base',
  lg: 'text-base md:text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  none: '',
} satisfies Record<Size | 'xl' | '2xl' | '3xl', string>

export const errorStateClass = cn(
  '[&[data-error]]:border-error-800 [&[data-error]]:shadow-error',
  'dark:[&[data-error]]:border-error-800',
)

//  SIZES

export const paddingSize = {
  sm: 'py-sm-y px-sm-x',
  md: 'py-sm-y px-sm-x md:py-md-y md:px-md-x',
  lg: 'py-md-y px-md-x md:py-lg-y md:px-lg-x',
  none: '',
} satisfies Record<Size, string>

export const iconPaddingSize = {
  sm: 'p-sm-y',
  md: 'p-sm-y md:p-md-y',
  lg: 'p-md-y md:p-lg-y',
  inline: 'p-0',
  none: '',
} satisfies Record<Size | 'inline', string>

export const childrenIconSize = {
  sm: '[&_svg]:h-sm-icon [&_svg]:w-sm-icon [&_svg]:min-w-sm-icon',
  md: '[&_svg]:h-sm-icon [&_svg]:w-sm-icon [&_svg]:min-w-sm-icon md:[&_svg]:h-md-icon md:[&_svg]:w-md-icon md:[&_svg]:min-w-md-icon',
  lg: '[&_svg]:h-md-icon [&_svg]:w-md-icon [&_svg]:min-w-md-icon md:[&_svg]:h-lg-icon md:[&_svg]:w-lg-icon md:[&_svg]:min-w-lg-icon',
  inline: '[&_svg]:h-text-height-sm [&_svg]:w-text-height-sm [&_svg]:min-w-text-height-sm',
  none: '',
} satisfies Record<Size | 'inline', string>

// STYLES

export const baseVariant = {
  text: {
    primary: 'border-transparent bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg',
    secondary: 'border-transparent bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg',
    terciary: 'border-transparent bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg',
    none: '',
  },
  outlined: {
    primary:
      'border-primary-800 dark:border-primary-100 bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg',
    secondary:
      'border-secondary-800 dark:border-secondary-100 bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg',
    terciary:
      'border-terciary-800 dark:border-terciary-100 bg-bg dark:bg-dark-bg from-bg dark:from-dark-bg',
    none: '',
  },
  contained: {
    primary: 'border-primary-800 bg-primary-700 from-primary-700 text-primary-50',
    secondary: 'border-secondary-800 bg-secondary-700 from-secondary-700 text-secondary-50',
    terciary: 'border-terciary-800 bg-terciary-700 from-terciary-700 text-terciary-50',
    none: '',
  },
} satisfies Record<Variant, Record<Color, string>>

export const toggleBaseBg = 'bg-dark-950/5 dark:bg-dark-950/20'

// Use hoverable: instead of hover: — prevents stuck hover on touchscreens
export const interactiveVariant = {
  text: {
    primary: cn(
      'hoverable:bg-primary-100 dark:hoverable:bg-primary-100/10',
      'active:bg-primary-200 dark:active:bg-primary-100/20',
      '[&[data-selected]]:bg-primary-100 dark:[&[data-selected]]:bg-primary-100/15',
      'hoverable:[&[data-selected]]:bg-primary-200 dark:hoverable:[&[data-selected]]:bg-primary-100/25',
      '[&[data-selected]]:active:bg-primary-300 dark:[&[data-selected]]:active:bg-primary-100/30',
    ),
    secondary: cn(
      'hoverable:bg-secondary-100 dark:hoverable:bg-secondary-100/10',
      'active:bg-secondary-200 dark:active:bg-secondary-100/20',
      '[&[data-selected]]:bg-secondary-100 dark:[&[data-selected]]:bg-secondary-100/15',
      'hoverable:[&[data-selected]]:bg-secondary-200 dark:hoverable:[&[data-selected]]:bg-secondary-100/25',
      '[&[data-selected]]:active:bg-secondary-300 dark:[&[data-selected]]:active:bg-secondary-100/30',
    ),
    terciary: cn(
      'hoverable:bg-terciary-100 dark:hoverable:bg-terciary-100/10',
      'active:bg-terciary-200 dark:active:bg-terciary-100/20',
      '[&[data-selected]]:bg-terciary-100 dark:[&[data-selected]]:bg-terciary-100/15',
      'hoverable:[&[data-selected]]:bg-terciary-200 dark:hoverable:[&[data-selected]]:bg-terciary-100/25',
      '[&[data-selected]]:active:bg-terciary-300 dark:[&[data-selected]]:active:bg-terciary-100/30',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'hoverable:bg-primary-100 dark:hoverable:bg-primary-100/10',
      'active:bg-primary-200 dark:active:bg-primary-100/20',
      '[&[data-selected]]:bg-primary-100 dark:[&[data-selected]]:bg-primary-100/15',
      'hoverable:[&[data-selected]]:bg-primary-200 dark:hoverable:[&[data-selected]]:bg-primary-100/25',
      '[&[data-selected]]:active:bg-primary-300 dark:[&[data-selected]]:active:bg-primary-100/30',
    ),
    secondary: cn(
      'hoverable:bg-secondary-100 dark:hoverable:bg-secondary-100/10',
      'active:bg-secondary-200 dark:active:bg-secondary-100/20',
      '[&[data-selected]]:bg-secondary-100 dark:[&[data-selected]]:bg-secondary-100/15',
      'hoverable:[&[data-selected]]:bg-secondary-200 dark:hoverable:[&[data-selected]]:bg-secondary-100/25',
      '[&[data-selected]]:active:bg-secondary-300 dark:[&[data-selected]]:active:bg-secondary-100/30',
    ),
    terciary: cn(
      'hoverable:bg-terciary-100 dark:hoverable:bg-terciary-100/10',
      'active:bg-terciary-200 dark:active:bg-terciary-100/20',
      '[&[data-selected]]:bg-terciary-100 dark:[&[data-selected]]:bg-terciary-100/15',
      'hoverable:[&[data-selected]]:bg-terciary-200 dark:hoverable:[&[data-selected]]:bg-terciary-100/25',
      '[&[data-selected]]:active:bg-terciary-300 dark:[&[data-selected]]:active:bg-terciary-100/30',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'hoverable:bg-primary-600 active:bg-primary-500',
      '[&[data-selected]]:bg-primary-600 hoverable:[&[data-selected]]:bg-primary-500 [&[data-selected]]:active:bg-primary-500',
    ),
    secondary: cn(
      'hoverable:bg-secondary-600 active:bg-secondary-500',
      '[&[data-selected]]:bg-secondary-600 hoverable:[&[data-selected]]:bg-secondary-500 [&[data-selected]]:active:bg-secondary-500',
    ),
    terciary: cn(
      'hoverable:bg-terciary-600 active:bg-terciary-500',
      '[&[data-selected]]:bg-terciary-600 hoverable:[&[data-selected]]:bg-terciary-500 [&[data-selected]]:active:bg-terciary-500',
    ),
    none: '',
  },
} satisfies Record<Variant, Record<Color, string>>

// DISABLED — intentionally flat (variant only, no color dimension).
// Disabled state uses neutral dark-* colors regardless of component color.

export const disabledVariant = {
  text: cn(
    'disabled-aria:cursor-not-allowed disabled-aria:bg-dark-200 disabled-aria:text-dark-500 disabled-aria:opacity-50 disabled-aria:shadow-none',
    'disabled-aria:hoverable:bg-dark-200 disabled-aria:focus-within:bg-dark-200 disabled-aria:focus-within:ring-0 disabled-aria:focus-visible:bg-dark-200 disabled-aria:focus-visible:ring-0 disabled-aria:group-hoverable:bg-dark-200',
    'dark:disabled-aria:bg-dark-200 dark:disabled-aria:text-dark-500',
    'dark:disabled-aria:hoverable:bg-dark-200 dark:disabled-aria:focus-within:bg-dark-200 dark:disabled-aria:focus-visible:bg-dark-200 dark:disabled-aria:group-hoverable:bg-dark-200',
  ),
  outlined: cn(
    'disabled-aria:cursor-not-allowed disabled-aria:border-dark-500 disabled-aria:bg-dark-200 disabled-aria:text-dark-500 disabled-aria:opacity-50 disabled-aria:shadow-none',
    'disabled-aria:hoverable:bg-dark-200 disabled-aria:focus-within:bg-dark-200 disabled-aria:focus-within:ring-0 disabled-aria:focus-visible:bg-dark-200 disabled-aria:focus-visible:ring-0 disabled-aria:group-hoverable:bg-dark-200',
    'dark:disabled-aria:border-dark-500 dark:disabled-aria:bg-dark-200 dark:disabled-aria:text-dark-500',
    'dark:disabled-aria:hoverable:bg-dark-200 dark:disabled-aria:focus-within:bg-dark-200 dark:disabled-aria:focus-visible:bg-dark-200 dark:disabled-aria:group-hoverable:bg-dark-200',
  ),
  contained: cn(
    'disabled-aria:cursor-not-allowed disabled-aria:border-dark-500 disabled-aria:bg-dark-500 disabled-aria:text-dark-300 disabled-aria:opacity-50 disabled-aria:shadow-none',
    'disabled-aria:hoverable:bg-dark-500 disabled-aria:focus-within:bg-dark-500 disabled-aria:focus-within:ring-0 disabled-aria:focus-visible:bg-dark-500 disabled-aria:focus-visible:ring-0 disabled-aria:group-hoverable:bg-dark-500',
  ),
} satisfies Record<Variant, string>

/** FOCUS */

export const focusVisibleVariant = {
  text: {
    primary: cn(
      'focus-visible:bg-primary-100 focus-visible:ring-primary-800',
      'dark:focus-visible:bg-primary-100/10 dark:focus-visible:ring-primary-100',
      'group-focus-visible:bg-primary-100 dark:group-focus-visible:bg-primary-100/10',
      '[&[data-selected]]:focus-visible:bg-primary-200 dark:[&[data-selected]]:focus-visible:bg-primary-100/25',
    ),
    secondary: cn(
      'focus-visible:bg-secondary-100 focus-visible:ring-secondary-800',
      'dark:focus-visible:bg-secondary-100/10 dark:focus-visible:ring-secondary-100',
      'group-focus-visible:bg-secondary-100 dark:group-focus-visible:bg-secondary-100/10',
      '[&[data-selected]]:focus-visible:bg-secondary-200 dark:[&[data-selected]]:focus-visible:bg-secondary-100/25',
    ),
    terciary: cn(
      'focus-visible:bg-terciary-100 focus-visible:ring-terciary-800',
      'dark:focus-visible:bg-terciary-100/10 dark:focus-visible:ring-terciary-100',
      'group-focus-visible:bg-terciary-100 dark:group-focus-visible:bg-terciary-100/10',
      '[&[data-selected]]:focus-visible:bg-terciary-200 dark:[&[data-selected]]:focus-visible:bg-terciary-100/25',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      'focus-visible:bg-primary-100 focus-visible:ring-primary-800',
      'dark:focus-visible:bg-primary-100/10 dark:focus-visible:ring-primary-100',
      'group-focus-visible:bg-primary-100 dark:group-focus-visible:bg-primary-100/10',
      '[&[data-selected]]:focus-visible:bg-primary-200 dark:[&[data-selected]]:focus-visible:bg-primary-100/25',
    ),
    secondary: cn(
      'focus-visible:bg-secondary-100 focus-visible:ring-secondary-800',
      'dark:focus-visible:bg-secondary-100/10 dark:focus-visible:ring-secondary-100',
      'group-focus-visible:bg-secondary-100 dark:group-focus-visible:bg-secondary-100/10',
      '[&[data-selected]]:focus-visible:bg-secondary-200 dark:[&[data-selected]]:focus-visible:bg-secondary-100/25',
    ),
    terciary: cn(
      'focus-visible:bg-terciary-100 focus-visible:ring-terciary-800',
      'dark:focus-visible:bg-terciary-100/10 dark:focus-visible:ring-terciary-100',
      'group-focus-visible:bg-terciary-100 dark:group-focus-visible:bg-terciary-100/10',
      '[&[data-selected]]:focus-visible:bg-terciary-200 dark:[&[data-selected]]:focus-visible:bg-terciary-100/25',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      'focus-visible:bg-primary-600 focus-visible:ring-primary-900',
      'group-focus-visible:bg-primary-600',
      '[&[data-selected]]:focus-visible:bg-primary-500',
    ),
    secondary: cn(
      'focus-visible:bg-secondary-600 focus-visible:ring-secondary-900',
      'group-focus-visible:bg-secondary-600',
      '[&[data-selected]]:focus-visible:bg-secondary-500',
    ),
    terciary: cn(
      'focus-visible:bg-terciary-600 focus-visible:ring-terciary-900',
      'group-focus-visible:bg-terciary-600',
      '[&[data-selected]]:focus-visible:bg-terciary-500',
    ),
    none: '',
  },
} satisfies Record<Variant, Record<Color, string>>

export const focusWithinVariant = {
  text: {
    primary: cn(
      'focus-within:bg-primary-100 focus-within:ring-primary-800',
      'dark:focus-within:bg-primary-100/10 dark:focus-within:ring-primary-100',
      'group-focus-within:bg-primary-100 dark:group-focus-within:bg-primary-100/10',
      '[&[data-selected]]:focus-within:bg-primary-200 dark:[&[data-selected]]:focus-within:bg-primary-100/25',
    ),
    secondary: cn(
      'focus-within:bg-secondary-100 focus-within:ring-secondary-800',
      'dark:focus-within:bg-secondary-100/10 dark:focus-within:ring-secondary-100',
      'group-focus-within:bg-secondary-100 dark:group-focus-within:bg-secondary-100/10',
      '[&[data-selected]]:focus-within:bg-secondary-200 dark:[&[data-selected]]:focus-within:bg-secondary-100/25',
    ),
    terciary: cn(
      'focus-within:bg-terciary-100 focus-within:ring-terciary-800',
      'dark:focus-within:bg-terciary-100/10 dark:focus-within:ring-terciary-100',
      'group-focus-within:bg-terciary-100 dark:group-focus-within:bg-terciary-100/10',
      '[&[data-selected]]:focus-within:bg-terciary-200 dark:[&[data-selected]]:focus-within:bg-terciary-100/25',
    ),
    none: '',
  },

  outlined: {
    primary: cn(
      'focus-within:bg-primary-100 focus-within:ring-primary-800',
      'dark:focus-within:bg-primary-100/10 dark:focus-within:ring-primary-100',
      'group-focus-within:bg-primary-100 dark:group-focus-within:bg-primary-100/10',
      '[&[data-selected]]:focus-within:bg-primary-200 dark:[&[data-selected]]:focus-within:bg-primary-100/25',
    ),
    secondary: cn(
      'focus-within:bg-secondary-100 focus-within:ring-secondary-800',
      'dark:focus-within:bg-secondary-100/10 dark:focus-within:ring-secondary-100',
      'group-focus-within:bg-secondary-100 dark:group-focus-within:bg-secondary-100/10',
      '[&[data-selected]]:focus-within:bg-secondary-200 dark:[&[data-selected]]:focus-within:bg-secondary-100/25',
    ),
    terciary: cn(
      'focus-within:bg-terciary-100 focus-within:ring-terciary-800',
      'dark:focus-within:bg-terciary-100/10 dark:focus-within:ring-terciary-100',
      'group-focus-within:bg-terciary-100 dark:group-focus-within:bg-terciary-100/10',
      '[&[data-selected]]:focus-within:bg-terciary-200 dark:[&[data-selected]]:focus-within:bg-terciary-100/25',
    ),
    none: '',
  },

  contained: {
    primary: cn(
      'focus-within:bg-primary-600 focus-within:ring-primary-900',
      'group-focus-within:bg-primary-600',
      '[&[data-selected]]:focus-within:bg-primary-500',
    ),
    secondary: cn(
      'focus-within:bg-secondary-600 focus-within:ring-secondary-900',
      'group-focus-within:bg-secondary-600',
      '[&[data-selected]]:focus-within:bg-secondary-500',
    ),
    terciary: cn(
      'focus-within:bg-terciary-600 focus-within:ring-terciary-900',
      'group-focus-within:bg-terciary-600',
      '[&[data-selected]]:focus-within:bg-terciary-500',
    ),
    none: '',
  },
} satisfies Record<Variant, Record<Color, string>>
