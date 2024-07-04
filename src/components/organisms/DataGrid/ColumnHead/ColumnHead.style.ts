import { cn } from '@/utils/utils'

export const cellOverflow = cn(
  'select-text overflow-x-scroll text-left [&::-webkit-scrollbar]:hidden',
)

export const selectCellSize = {
  sm: cn('p-smPY'),
  md: cn('p-mdPY'),
  lg: cn('p-lgPY'),
  none: '',
}

export const cellSize = {
  sm: cn('px-smPX py-smPY text-sm'),
  md: cn('px-mdPX py-mdPY text-base'),
  lg: cn('px-lgPX py-lgPY text-lg'),
  none: '',
}

export const searchMenuClass = cn('rounded-md pt-0')

export const closeIconState = cn('opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70')

export const filterMenuVisibility = cn(
  'border-transparent transition-opacity focus-within:opacity-100 group-hover:bg-transparent group-hover:opacity-100',
)
