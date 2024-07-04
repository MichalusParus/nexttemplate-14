import { cn } from '@/utils/utils'

export const rowClass = cn('relative flex items-center justify-between')

export const gridRowPadding = {
  sm: cn('px-smPX text-sm'),
  md: cn('text-md px-mdPX'),
  lg: cn('px-lgPX text-lg'),
  none: '',
}

export const paginationMarginClass = {
  sm: cn('mr-8'),
  md: cn('mr-10'),
  lg: cn('mr-11'),
  none: '',
}
