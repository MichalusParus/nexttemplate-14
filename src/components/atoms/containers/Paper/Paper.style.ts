import { cn } from '@/utils/utils'

export const paperVariant = {
  text: {
    primary: cn('bg-bg'),
    secondary: cn('bg-bg'),
    terciary: cn('bg-bg'),
    none: '',
  },
  outlined: {
    primary: cn('border border-primary-800 bg-primary-50 from-primary-50'),
    secondary: cn('border border-secondary-800 bg-secondary-50 from-secondary-50'),
    terciary: cn('border border-terciary-800 bg-terciary-50 from-terciary-50'),
    none: '',
  },
  contained: {
    primary: cn('border border-primary-800 bg-primary-800 from-primary-800 text-primary-50'),
    secondary: cn(
      'border border-secondary-800 bg-secondary-800 from-secondary-800 text-secondary-50',
    ),
    terciary: cn('border border-terciary-800 bg-terciary-800 from-terciary-800 text-terciary-50'),
    none: '',
  },
}
