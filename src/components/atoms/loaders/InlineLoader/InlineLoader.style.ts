import { cn } from '@/utils/utils'

export const dottClass = cn('animate-inline-loader mx-0.5 inline-flex rounded-full bg-current')

export const loaderSize = {
  sm: cn('p-sm-y'),
  md: cn('p-md-y'),
  lg: cn('p-lg-y'),
  inline: cn('p-0'),
  none: '',
}
