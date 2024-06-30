import { cn } from '@/utils/utils'

export const avatarClass = cn(
  'flex items-center justify-center overflow-hidden rounded-full border font-bold',
)

export const avatarVariant = {
  text: {
    primary: cn('border-transparent text-primary-800'),
    secondary: cn('border-transparent text-secondary-800'),
    terciary: cn('border-transparent text-terciary-800'),
    none: '',
  },
  outlined: {
    primary: cn('border-primary-800 bg-primary-100 text-primary-800'),
    secondary: cn('border-secondary-800 bg-secondary-100 text-secondary-800'),
    terciary: cn('border-terciary-800 bg-terciary-100 text-terciary-800'),
    none: '',
  },
  contained: {
    primary: cn('border-primary-50 bg-primary-800 text-primary-50'),
    secondary: cn('border-secondary-50 bg-secondary-800 text-secondary-50'),
    terciary: cn('border-terciary-50 bg-terciary-800 text-terciary-50'),
    none: '',
  },
}

export const avatarSize = {
  sm: cn('text-md h-8 w-8 min-w-8'),
  md: cn('h-10 w-10 min-w-10 text-xl'),
  lg: cn('h-12 w-12 min-w-12 text-2xl'),
  none: '',
}
