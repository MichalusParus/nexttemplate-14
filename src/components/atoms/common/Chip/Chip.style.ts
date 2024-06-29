export const chipClass = 'flex items-center border rounded-3xl max-w-max '

export const chipVariant = {
  text: {
    primary: 'border-transparent bg-transparent text-primary-800',
    secondary: 'border-transparent bg-transparent text-secondary-800',
    terciary: 'border-transparent bg-transparent text-terciary-800',
    error: 'border-transparent bg-transparent text-error-800',
    none: '',
  },
  outlined: {
    primary: 'border-primary-800 bg-transparent text-primary-800',
    secondary: 'border-secondary-800 bg-transparent text-secondary-800',
    terciary: 'border-terciary-800 bg-transparent text-terciary-800',
    error: 'border-error-800 bg-transparent text-error-800',
    none: '',
  },
  contained: {
    primary: 'border-primary-800 bg-primary-800 text-primary-50',
    secondary: 'border-secondary-800 bg-secondary-800 text-secondary-50',
    terciary: 'border-terciary-800 bg-terciary-800 text-terciary-50',
    error: 'border-error-800 bg-error-800 text-error-50',
    none: '',
  },
}

export const chipSize = {
  sm: 'text-sm [&_svg]:h-md [&_svg]:min-w-md [&_span]:leading-4',
  md: 'text-base [&_svg]:h-lg [&_svg]:min-w-lg [&_span]:leading-5',
  lg: 'text-lg [&_svg]:h-xl [&_svg]:min-w-xl [&_span]:leading-6',
  none: '',
}
