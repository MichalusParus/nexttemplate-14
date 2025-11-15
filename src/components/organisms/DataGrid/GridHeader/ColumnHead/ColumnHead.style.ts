import { cn } from '@/utils/utils'

export const cellOverflow = cn(
  'select-text overflow-x-scroll text-left [&::-webkit-scrollbar]:hidden',
)

export const cellSize = {
  sm: cn('py-sm-y px-sm-x text-sm'),
  md: cn('px-md-x py-md-y text-base'),
  lg: cn('py-lg-y px-lg-x text-lg'),
  none: '',
}

export const closeIconState = cn(
  'opacity-0 transition-colors group-hover:opacity-50 group-focus-visible:opacity-50',
)

export const filterMenuVisibility = cn(
  'border-transparent opacity-0 transition-colors focus-visible:opacity-100 group-hover:bg-transparent group-hover:opacity-50 group-focus-visible:opacity-50',
)

export const alignColumn = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
}
