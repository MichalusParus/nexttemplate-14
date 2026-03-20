import { cn } from '@/utils/utils'

export const cellOverflow = cn(
  'select-text overflow-x-scroll text-left [&::-webkit-scrollbar]:hidden',
)

export const closeIconState = cn(
  'opacity-0 transition-colors group-hoverable:opacity-50 group-focus-visible:opacity-50',
)

export const filterMenuVisibility = cn(
  'border-transparent opacity-0 transition-colors focus-visible:opacity-100 group-hoverable:bg-transparent group-hoverable:opacity-50 group-focus-visible:opacity-50',
)

export const alignColumn = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
}
