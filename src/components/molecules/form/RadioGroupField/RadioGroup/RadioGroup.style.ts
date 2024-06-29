export const radioClass =
  'relative mr-2 cursor-pointer appearance-none rounded-full transition-activity focus:outline-none'

export const radioVariant = {
  text: {
    primary:
      'border border-transparent bg-transparent after:bg-primary-800 ' +
      'hover:bg-primary-200 focus-visible:bg-primary-200 ' +
      'active:bg-primary-100 checked:bg-primary-100',
    secondary:
      'border border-transparent bg-transparent after:bg-secondary-800 ' +
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 ' +
      'active:bg-secondary-100 checked:bg-secondary-100',
    terciary:
      'border border-transparent bg-transparent after:bg-terciary-800 ' +
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 ' +
      'active:bg-terciary-100 checked:bg-terciary-100',
    none: '',
  },
  outlined: {
    primary:
      'border border-primary-800 bg-transparent after:bg-primary-800 ' +
      'hover:bg-primary-200 focus-visible:bg-primary-200 ' +
      'active:bg-primary-100 checked:bg-primary-100',
    secondary:
      'border border-secondary-800 bg-transparent after:bg-secondary-800 ' +
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 ' +
      'active:bg-secondary-100 checked:bg-secondary-100',
    terciary:
      'border border-terciary-800 bg-transparent after:bg-terciary-800 ' +
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 ' +
      'active:bg-terciary-100 checked:bg-terciary-100',
    none: '',
  },
  contained: {
    primary:
      'border border-primary-900 bg-primary-800 after:bg-primary-50 ' +
      'hover:bg-primary-900 focus-visible:bg-primary-900 ' +
      'active:bg-primary-700 checked:bg-primary-700 ',
    secondary:
      'border border-secondary-900 bg-secondary-800 text-secondary-50 after:bg-secondary-50 ' +
      'hover:bg-secondary-900 focus-visible:bg-secondary-900 ' +
      'active:bg-secondary-700 checked:bg-secondary-700 ',
    terciary:
      'border border-terciary-900 bg-terciary-800 text-terciary-50 after:bg-terciary-50 ' +
      'hover:bg-terciary-900 focus-visible:bg-terciary-900 ' +
      'active:bg-terciary-700 checked:bg-terciary-700 ',
    none: '',
  },
}

export const afterClass =
  'after:invisible after:absolute after:left-[50%] after:top-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full ' +
  'after:opacity-0 after:transition-opacity after:content-[""] checked:after:visible checked:after:opacity-100 disabled:after:bg-dark-500'

export const disableVariant = {
  text: 'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  outlined:
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:opacity-50',
  contained:
    'disabled:cursor-not-allowed disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-500 disabled:opacity-50',
}

export const radioSize = {
  sm: 'mr-3 mb-1 text-sm [&_input]:w-smIcon [&_input]:h-smIcon [&_input]:after:h-2 [&_input]:after:w-2',
  md: 'mr-4 mb-2 text-base [&_input]:w-mdIcon [&_input]:h-mdIcon [&_input]:after:h-2.5 [&_input]:after:w-2.5',
  lg: 'mr-5 mb-3 text-lg [&_input]:w-lgIcon [&_input]:h-lgIcon [&_input]:after:h-3 [&_input]:after:w-3',
  none: '',
}
