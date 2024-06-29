export const buttonClass =
  'relative rounded-md border transition-activity focus:outline-none [&.error]:shadow-error'

export const buttonVariant = {
  text: {
    primary:
      'border-transparent bg-transparent text-primary-800 ' +
      'hover:bg-primary-200 focus-visible:bg-primary-200 active:bg-primary-100 ' +
      '[&.selected]:bg-primary-100 [&.selected]:hover:bg-primary-200 [&.selected]:focus-visible:bg-primary-200',
    secondary:
      'border-transparent bg-transparent text-secondary-800 ' +
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 active:bg-secondary-100 ' +
      '[&.selected]:bg-secondary-100 [&.selected]:hover:bg-secondary-200 [&.selected]:focus-visible:bg-secondary-200',
    terciary:
      'border-transparent bg-transparent text-terciary-800 ' +
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 active:bg-terciary-100 ' +
      '[&.selected]:bg-terciary-100 [&.selected]:hover:bg-terciary-200 [&.selected]:focus-visible:bg-terciary-200',
    error:
      'border-transparent bg-transparent text-error-800 ' +
      'hover:bg-error-200 focus-visible:bg-error-200 active:bg-error-100 ' +
      '[&.selected]:bg-error-100 [&.selected]:hover:bg-error-200 [&.selected]:focus-visible:bg-error-200',
    none: '',
  },
  outlined: {
    primary:
      'border-primary-800 bg-transparent text-primary-800 ' +
      'hover:bg-primary-200 focus-visible:bg-primary-200 active:bg-primary-100 ' +
      '[&.selected]:bg-primary-100 [&.selected]:hover:bg-primary-200 [&.selected]:focus-visible:bg-primary-200',
    secondary:
      'text-secondary-800 bg-transparent border-secondary-800 ' +
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 active:bg-secondary-100 ' +
      '[&.selected]:bg-secondary-100 [&.selected]:hover:bg-secondary-200 [&.selected]:focus-visible:bg-secondary-200',
    terciary:
      'text-terciary-800 bg-transparent border-terciary-800 ' +
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 active:bg-terciary-100 ' +
      '[&.selected]:bg-terciary-100 [&.selected]:hover:bg-terciary-200 [&.selected]:focus-visible:bg-terciary-200',
    error:
      'text-error-800 bg-transparent border-error-800 ' +
      'hover:bg-error-200 focus-visible:bg-error-200 active:bg-error-100 ' +
      '[&.selected]:bg-error-100 [&.selected]:hover:bg-error-200 [&.selected]:focus-visible:bg-error-200',
    none: '',
  },
  contained: {
    primary:
      'border-primary-800 bg-primary-800 text-primary-50 ' +
      'hover:border-primary-900 hover:bg-primary-900 focus-visible:border-primary-900 focus-visible:bg-primary-900 active:bg-primary-700 ' +
      '[&.selected]:bg-primary-700 [&.selected]:hover:bg-primary-900 [&.selected]:focus-visible:bg-primary-900',
    secondary:
      'border-secondary-800 bg-secondary-800 text-secondary-50 ' +
      'hover:border-secondary-900 hover:bg-secondary-900 focus-visible:border-secondary-900 focus-visible:bg-secondary-900 active:bg-secondary-700 ' +
      '[&.selected]:bg-secondary-700 [&.selected]:hover:bg-secondary-900 [&.selected]:focus-visible:bg-secondary-900',
    terciary:
      'border-terciary-800 bg-terciary-800 text-terciary-50 ' +
      'hover:border-terciary-900 hover:bg-terciary-900 focus-visible:border-terciary-900 focus-visible:bg-terciary-900 active:bg-terciary-700 ' +
      '[&.selected]:bg-terciary-700 [&.selected]:hover:bg-terciary-900 [&.selected]:focus-visible:bg-terciary-900',
    error:
      'border-error-800 bg-error-800 text-error-50 ' +
      'hover:border-error-900 hover:bg-error-900 focus-visible:border-error-900 focus-visible:bg-error-900 active:bg-error-700 ' +
      '[&.selected]:bg-error-700 [&.selected]:hover:bg-error-900 [&.selected]:focus-visible:bg-error-900',
    none: '',
  },
}

export const buttonDisabledVariant = {
  text: 'disabled:cursor-not-allowed disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  outlined:
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  contained:
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-300 disabled:shadow-none disabled:opacity-50',
}

export const iconOnlySize = {
  sm: 'p-smPY text-sm ',
  md: 'p-mdPY text-md',
  lg: 'p-lgPY text-lg',
  inline: 'px-1 [&.Button]:border-0 [&.Link]:border-0',
  none: '',
}

export const buttonContentSize = {
  sm: 'px-smPX py-smPY text-sm',
  md: 'px-mdPX py-mdPY text-base',
  lg: 'px-lgPX py-lgPY text-lg',
  inline: 'px-1 [&.Button]:border-0 [&.Link]:border-0',
  none: '',
}

export const buttonIconSize = {
  sm: '[&_svg]:h-smIcon [&_svg]:w-smIcon [&_svg]:min-w-smIcon',
  md: '[&_svg]:h-mdIcon [&_svg]:w-mdIcon [&_svg]:min-w-mdIcon',
  lg: '[&_svg]:h-lgIcon [&_svg]:w-lgIcon [&_svg]:min-w-lgIcon',
  inline: '[&_svg]:h-sm [&_svg]:w-sm [&_svg]:min-w-sm',
  none: '',
}

export const innerWrapClass =
  'flex w-full items-center justify-center whitespace-nowrap font-semibold'
