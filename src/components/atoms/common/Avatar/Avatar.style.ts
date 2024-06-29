export const avatarClass =
  'flex items-center justify-center overflow-hidden rounded-full border font-bold'

export const avatarVariant = {
  text: {
    primary: 'border-transparent text-primary-800',
    secondary: 'border-transparent text-secondary-800',
    terciary: 'border-transparent text-terciary-800',
    none: '',
  },
  outlined: {
    primary: 'border-primary-800 bg-primary-100 text-primary-800',
    secondary: 'border-secondary-800 bg-secondary-100 text-secondary-800',
    terciary: 'border-terciary-800 bg-terciary-100 text-terciary-800',
    none: '',
  },
  contained: {
    primary: 'border-primary-50 bg-primary-800 text-primary-50',
    secondary: 'border-secondary-50 bg-secondary-800 text-secondary-50',
    terciary: 'border-terciary-50 bg-terciary-800 text-terciary-50',
    none: '',
  },
}

export const avatarSize = {
  sm: 'h-8 w-8 min-w-8 text-md ',
  md: 'h-10 w-10 min-w-10 text-xl ',
  lg: 'h-12 w-12 min-w-12 text-2xl ',
  none: '',
}
