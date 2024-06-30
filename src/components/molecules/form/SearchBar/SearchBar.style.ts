import { cn } from '@/utils/utils'

export const searchColor = {
  text: {
    primary: cn('text-primary-800'),
    secondary: cn('text-secondary-800'),
    terciary: cn('text-terciary-800'),
    none: '',
  },
  outlined: {
    primary: cn('text-primary-800'),
    secondary: cn('text-secondary-800'),
    terciary: cn('text-terciary-800'),
    none: '',
  },
  contained: {
    primary: cn('text-primary-50'),
    secondary: cn('text-secondary-50'),
    terciary: cn('text-terciary-50'),
    none: '',
  },
}

export const searchSize = {
  sm: cn('[&_input]:pl-8'),
  md: cn('[&_input]:pl-10'),
  lg: cn('[&_input]:pl-12'),
  none: '',
}
