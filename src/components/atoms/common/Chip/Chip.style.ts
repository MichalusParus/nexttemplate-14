import { cn } from '@/utils/utils'

export const chipClass = cn('flex max-w-max items-center rounded-3xl border')

export const chipVariant = {
  text: {
    primary: cn('border-transparent bg-transparent text-primary-800'),
    secondary: cn('border-transparent bg-transparent text-secondary-800'),
    terciary: cn('border-transparent bg-transparent text-terciary-800'),
    error: cn('border-transparent bg-transparent text-error-800'),
    none: '',
  },
  outlined: {
    primary: cn('border-primary-800 bg-transparent text-primary-800'),
    secondary: cn('border-secondary-800 bg-transparent text-secondary-800'),
    terciary: cn('border-terciary-800 bg-transparent text-terciary-800'),
    error: cn('border-error-800 bg-transparent text-error-800'),
    none: '',
  },
  contained: {
    primary: cn('border-primary-800 bg-primary-800 text-primary-50'),
    secondary: cn('border-secondary-800 bg-secondary-800 text-secondary-50'),
    terciary: cn('border-terciary-800 bg-terciary-800 text-terciary-50'),
    error: cn('border-error-800 bg-error-800 text-error-50'),
    none: '',
  },
}

export const chipSize = {
  sm: cn('text-sm [&_span]:leading-4 [&_svg]:h-md [&_svg]:min-w-md'),
  md: cn('text-base [&_span]:leading-5 [&_svg]:h-lg [&_svg]:min-w-lg'),
  lg: cn('text-lg [&_span]:leading-6 [&_svg]:h-xl [&_svg]:min-w-xl'),
  none: '',
}
