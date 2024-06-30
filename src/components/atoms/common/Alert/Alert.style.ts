import { cn } from '@/utils/utils'

export const alertClass = cn('flex items-start rounded-md border')

export const alertVariant = {
  text: {
    success: cn('border-transparent bg-success-300 bg-opacity-50 text-success-800'),
    info: cn('border-transparent bg-info-300 bg-opacity-50 text-info-800'),
    warning: cn('border-transparent bg-warning-300 bg-opacity-50 text-warning-800'),
    error: cn('border-transparent bg-error-300 bg-opacity-50 text-error-800'),
    none: '',
  },
  outlined: {
    success: cn('border-success-800 bg-success-300 bg-opacity-50 text-success-800'),
    info: cn('border-info-800 bg-info-300 bg-opacity-50 text-info-800'),
    warning: cn('border-warning-800 bg-warning-300 bg-opacity-50 text-warning-800'),
    error: cn('border-error-800 bg-error-300 bg-opacity-50 text-error-800'),
    none: '',
  },
  contained: {
    success: cn('border-success-800 bg-success-800 text-success-50'),
    info: cn('border-info-800 bg-info-800 text-info-50'),
    warning: cn('border-warning-800 bg-warning-800 text-warning-50'),
    error: cn('border-error-800 bg-error-800 text-error-50'),
    none: '',
  },
}

export const alertSize = {
  sm: cn('px-1 py-0.5 text-sm'),
  md: cn('px-1.5 py-1 text-base'),
  lg: cn('px-2 py-1.5 text-lg'),
  none: '',
}

export const alertIconSize = {
  sm: cn('[&_svg]:h-smIcon [&_svg]:w-smIcon [&_svg]:min-w-smIcon'),
  md: cn('[&_svg]:h-mdIcon [&_svg]:w-mdIcon [&_svg]:min-w-mdIcon'),
  lg: cn('[&_svg]:h-lgIcon [&_svg]:w-lgIcon [&_svg]:min-w-lgIcon'),
  none: '',
}
