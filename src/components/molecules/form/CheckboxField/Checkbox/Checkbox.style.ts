export const inputClass =
  'cursor-pointer appearance-none rounded-md transition-activity focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&.disabled]:cursor-not-allowed [&.disabled]:opacity-50'

export const switchClass =
  'mr-2 cursor-pointer appearance-none rounded-3xl transition-activity focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&.disabled]:cursor-not-allowed [&.disabled]:opacity-50'

export const checkClass = 'absolute left-0 top-0 z-10 cursor-pointer transition-opacity'

export const thumbClass = 'absolute rounded-full transition-dropdown'

export const checkboxVariant = {
  text: {
    primary:
      'border border-transparent bg-bg [&_.CheckIcon]:text-primary-800 ' +
      'hover:bg-primary-200 focus-visible:bg-primary-200 group-hover:bg-primary-200 group-focus-visible:bg-primary-200 ' +
      'active:bg-primary-100 checked:bg-primary-100 [&.selected]:bg-primary-100 ',
    secondary:
      'border border-transparent bg-bg [&_.CheckIcon]:text-secondary-800 ' +
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 group-hover:bg-secondary-200 group-focus-visible:bg-secondary-200 ' +
      'active:bg-secondary-100 checked:bg-secondary-100 [&.selected]:bg-secondary-100 ',
    terciary:
      'border border-transparent bg-bg [&_.CheckIcon]:text-terciary-800 ' +
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 group-hover:bg-terciary-200 group-focus-visible:bg-terciary-200 ' +
      'active:bg-terciary-100 checked:bg-terciary-100 [&.selected]:bg-terciary-100 ',
    none: '',
  },
  outlined: {
    primary:
      'border border-primary-800 bg-bg [&_.CheckIcon]:text-primary-800 ' +
      'hover:bg-primary-200 focus-visible:bg-primary-200 group-hover:bg-primary-200 group-focus-visible:bg-primary-200 ' +
      'active:bg-primary-100 checked:bg-primary-100 [&.selected]:bg-primary-100 ',
    secondary:
      'border border-secondary-800 bg-bg [&_.CheckIcon]:text-secondary-800 ' +
      'hover:bg-secondary-200 focus-visible:bg-secondary-200 group-hover:bg-secondary-200 group-focus-visible:bg-secondary-200 ' +
      'active:bg-secondary-100 checked:bg-secondary-100 [&.selected]:bg-secondary-100 ',
    terciary:
      'border border-terciary-800 bg-bg [&_.CheckIcon]:text-terciary-800 ' +
      'hover:bg-terciary-200 focus-visible:bg-terciary-200 group-hover:bg-terciary-200 group-focus-visible:bg-terciary-200 ' +
      'active:bg-terciary-100 checked:bg-terciary-100 [&.selected]:bg-terciary-100 ',
    none: '',
  },
  contained: {
    primary:
      'border border-primary-900 bg-primary-800 [&_.CheckIcon]:text-primary-50 ' +
      'hover:bg-primary-900 focus-visible:bg-primary-900 group-hover:bg-primary-900 group-focus-visible:bg-primary-900 ' +
      'active:bg-primary-700 checked:bg-primary-700 [&.selected]:bg-primary-700',
    secondary:
      'border border-secondary-900 bg-secondary-800 text-secondary-50 [&_.CheckIcon]:text-secondary-50 ' +
      'hover:bg-secondary-900 focus-visible:bg-secondary-900 group-hover:bg-secondary-900 group-focus-visible:bg-secondary-900 ' +
      'active:bg-secondary-700 checked:bg-secondary-700 [&.selected]:bg-secondary-700',
    terciary:
      'border border-terciary-900 bg-terciary-800 text-terciary-50 [&_.CheckIcon]:text-terciary-50 ' +
      'hover:bg-terciary-900 focus-visible:bg-terciary-900 group-hover:bg-terciary-900 group-focus-visible:bg-terciary-900 ' +
      'active:bg-terciary-700 checked:bg-terciary-700 [&.selected]:bg-terciary-700',
    none: '',
  },
  switch: {
    primary:
      'border border-primary-900 bg-primary-400 active:bg-primary-700 checked:bg-primary-700',
    secondary:
      'border border-secondary-900 bg-secondary-400 active:bg-secondary-700 checked:bg-secondary-700',
    terciary:
      'border border-terciary-900 bg-terciary-400 active:bg-terciary-700 checked:bg-terciary-700',
    none: '',
  },
}

export const checkVariant = {
  text: {
    primary: 'text-primary-800 [&.disabled]:text-dark-400 [&.disabled]:cursor-not-allowed',
    secondary: 'text-secondary-800 [&.disabled]:text-dark-400 [&.disabled]:cursor-not-allowed',
    terciary: 'text-terciary-800 [&.disabled]:text-dark-400 [&.disabled]:cursor-not-allowed',
    none: '',
  },
  outlined: {
    primary: 'text-primary-800 [&.disabled]:text-dark-400 [&.disabled]:cursor-not-allowed',
    secondary: 'text-secondary-800 [&.disabled]:text-dark-400 [&.disabled]:cursor-not-allowed',
    terciary: 'text-terciary-800 [&.disabled]:text-dark-400 [&.disabled]:cursor-not-allowed',
    none: '',
  },
  contained: {
    primary: 'text-primary-50 [&.disabled]:text-dark-200 [&.disabled]:cursor-not-allowed',
    secondary: 'text-secondary-50 [&.disabled]:text-dark-200 [&.disabled]:cursor-not-allowed',
    terciary: 'text-terciary-50 [&.disabled]:text-dark-200 [&.disabled]:cursor-not-allowed',
    none: '',
  },
  switch: {
    primary:
      'border border-primary-900 bg-primary-800 shadow-button group-hover:bg-primary-900 group-focus-within:bg-primary-900 ' +
      '[&.disabled]:bg-dark-400 [&.disabled]:group-hover:bg-dark-400 [&.disabled]:border-dark-400 [&.disabled]:opacity-50 [&.disabled]:cursor-not-allowed',
    secondary:
      'border border-secondary-900 bg-secondary-800 shadow-button group-hover:bg-secondary-900 group-focus-within:bg-secondary-900 ' +
      '[&.disabled]:bg-dark-400 [&.disabled]:group-hover:bg-dark-400 [&.disabled]:border-dark-400 [&.disabled]:opacity-50 [&.disabled]:cursor-not-allowed',
    terciary:
      'border border-terciary-900 bg-terciary-800 shadow-button group-hover:bg-terciary-900 group-focus-within:bg-terciary-900 ' +
      '[&.disabled]:bg-dark-400 [&.disabled]:group-hover:bg-dark-400 [&.disabled]:border-dark-400 [&.disabled]:opacity-50 [&.disabled]:cursor-not-allowed',
    none: '',
  },
}

export const checkboxSize = {
  sm: 'text-sm [&>*]:w-smIcon [&>*]:h-smIcon',
  md: 'text-base [&>*]:w-mdIcon [&>*]:h-mdIcon',
  lg: 'text-lg [&>*]:w-lgIcon [&>*]:h-lgIcon',
  none: '',
}

export const switchSize = {
  sm: 'text-sm [&>.SwitchThumb]:h-smIcon [&>.SwitchThumb]:w-smIcon [&>input]:h-smIcon [&>input]:w-8 ',
  md: 'text-base [&>.SwitchThumb]:h-mdIcon [&>.SwitchThumb]:w-mdIcon [&>input]:h-mdIcon [&>input]:w-10 ',
  lg: 'text-lg [&>.SwitchThumb]:h-lgIcon [&>.SwitchThumb]:w-lgIcon [&>input]:h-lgIcon [&>input]:w-12 ',
  none: '',
}

export const checkboxMargin = {
  sm: 'mr-3 mb-1',
  md: 'mr-4 mb-2',
  lg: 'mr-5 mb-3',
  none: '',
}

export const switchLeft = {
  sm: 'left-3',
  md: 'left-4',
  lg: 'left-5',
  none: '',
}

export const disabledVariant = {
  text: 'disabled:border-transparent disabled:bg-dark-200 [&.disabled]:border-transparent [&.disabled]:bg-dark-300',
  outlined:
    'disabled:border-dark-500 disabled:bg-dark-200 [&.disabled]:border-dark-400 [&.disabled]:bg-dark-300',
  contained:
    'disabled:border-dark-500 disabled:bg-dark-500 [&.disabled]:border-dark-400 [&.disabled]:bg-dark-400',
  switch:
    'disabled:border-dark-500 disabled:bg-dark-200 [&.disabled]:border-dark-400 [&.disabled]:bg-dark-300',
}
