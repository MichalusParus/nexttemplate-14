import { cn } from '@/utils/utils'

export const rowgroupVariant = {
  text: {
    primary: cn('border-transparent bg-transparent from-bg text-primary-800'),
    secondary: cn('border-transparent bg-transparent from-bg text-secondary-800'),
    terciary: cn('border-transparent bg-transparent from-bg text-terciary-800'),
    none: '',
  },
  outlined: {
    primary: cn('border-primary-800 bg-transparent from-bg text-primary-800'),
    secondary: cn('border-secondary-800 bg-transparent from-bg text-secondary-800'),
    terciary: cn('border-terciary-800 bg-transparent from-bg text-terciary-800'),
    none: '',
  },
  contained: {
    primary: cn('border-primary-50 bg-primary-800 from-primary-800 text-primary-50'),
    secondary: cn('border-secondary-50 bg-secondary-800 from-secondary-800 text-secondary-50'),
    terciary: cn('border-terciary-50 bg-terciary-800 from-terciary-800 text-terciary-50'),
    none: '',
  },
}

export const checkboxSize = {
  sm: cn('px-smPY py-smPY'),
  md: cn('px-mdPY py-mdPY'),
  lg: cn('px-lgPY py-lgPY'),
  none: '',
}
