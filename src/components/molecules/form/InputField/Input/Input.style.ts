export const inputClass =
  'w-full border font-semibold transition-activity placeholder:text-dark-400 rounded-md focus:outline-none'

export const inputVariant = {
  text: {
    primary:
      'border-transparent bg-transparent text-primary-800 ' +
      'hover:bg-primary-200 focus-within:bg-primary-100 active:bg-primary-100 [&.selected]:bg-primary-100 ',
    secondary:
      'text-secondary-800 bg-transparent border-transparent ' +
      'hover:bg-secondary-200 focus-within:bg-secondary-100 active:bg-secondary-100 [&.selected]:bg-secondary-100 ',
    terciary:
      'text-terciary-800 bg-transparent border-transparent ' +
      'hover:bg-terciary-200 focus-within:bg-terciary-100 active:bg-terciary-100 [&.selected]:bg-terciary-100 ',
    none: '',
  },
  outlined: {
    primary:
      'border-primary-800 bg-transparent text-primary-800 ' +
      'hover:bg-primary-200 focus-within:bg-primary-100 active:bg-primary-100 [&.selected]:bg-primary-100 ',
    secondary:
      'border-secondary-800 text-secondary-800 bg-transparent ' +
      'hover:bg-secondary-200 focus-within:bg-secondary-100 active:bg-secondary-100 [&.selected]:bg-secondary-100 ',
    terciary:
      'border-terciary-800 text-terciary-800 bg-transparent ' +
      'hover:bg-terciary-200 focus-within:bg-terciary-100 active:bg-terciary-100 [&.selected]:bg-terciary-100 ',
    none: '',
  },
  contained: {
    primary:
      'border-primary-800 bg-primary-800 text-primary-50 ' +
      'hover:border-primary-900 hover:bg-primary-900 focus-within:bg-primary-700 active:bg-primary-700 [&.selected]:bg-primary-700 ',
    secondary:
      'border-secondary-800  bg-secondary-800 text-secondary-50 ' +
      'hover:border-secondary-900 hover:bg-secondary-900 focus-within:bg-secondary-700 active:bg-secondary-700 [&.selected]:bg-secondary-700 ',
    terciary:
      'border-terciary-800  bg-terciary-800 text-terciary-50 ' +
      'hover:border-terciary-900 hover:bg-terciary-900 focus-within:bg-terciary-700 active:bg-terciary-700 [&.selected]:bg-terciary-700 ',
    none: '',
  },
}

export const disabledVariant = {
  text: 'disabled:cursor-not-allowed disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  outlined:
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  contained:
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-300 disabled:opacity-50',
}

export const inputSize = {
  sm: 'py-smPY px-smPX text-sm',
  md: 'py-mdPY px-mdPX text-base',
  lg: 'py-lgPY px-lgPX text-lg',
  none: '',
}
