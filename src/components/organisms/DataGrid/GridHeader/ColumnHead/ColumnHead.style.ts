import { cn } from '@/utils/utils'

export const cellOverflow = cn(
  'select-text overflow-x-scroll text-left [&::-webkit-scrollbar]:hidden',
)

export const cellSize = {
  sm: cn('px-smPX py-smPY text-sm'),
  md: cn('px-mdPX py-mdPY text-base'),
  lg: cn('px-lgPX py-lgPY text-lg'),
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
