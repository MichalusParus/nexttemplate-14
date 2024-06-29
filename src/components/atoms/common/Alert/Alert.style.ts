export const alertClass = 'flex items-start rounded-md border'

export const alertVariant = {
  text: {
    success: 'border-transparent bg-success-300 text-success-800 bg-opacity-50',
    info: 'border-transparent bg-info-300 text-info-800 bg-opacity-50',
    warning: 'border-transparent bg-warning-300 text-warning-800 bg-opacity-50',
    error: 'border-transparent bg-error-300 text-error-800 bg-opacity-50',
    none: '',
  },
  outlined: {
    success: 'border-success-800 bg-success-300 text-success-800 bg-opacity-50',
    info: 'border-info-800 bg-info-300 text-info-800 bg-opacity-50',
    warning: 'border-warning-800 bg-warning-300 text-warning-800 bg-opacity-50',
    error: 'border-error-800 bg-error-300 text-error-800 bg-opacity-50',
    none: '',
  },
  contained: {
    success: 'border-success-800 bg-success-800 text-success-50',
    info: 'border-info-800 bg-info-800 text-info-50',
    warning: 'border-warning-800 bg-warning-800 text-warning-50',
    error: 'border-error-800 bg-error-800 text-error-50',
    none: '',
  },
}

export const alertSize = {
  sm: 'px-1 py-0.5 text-sm',
  md: 'py-1 px-1.5 text-base',
  lg: 'py-1.5 px-2 text-lg',
  none: '',
}

export const alertIconSize = {
  sm: '[&_svg]:h-smIcon [&_svg]:w-smIcon [&_svg]:min-w-smIcon',
  md: '[&_svg]:h-mdIcon [&_svg]:w-mdIcon [&_svg]:min-w-mdIcon',
  lg: '[&_svg]:h-lgIcon [&_svg]:w-lgIcon [&_svg]:min-w-lgIcon',
  none: '',
}
