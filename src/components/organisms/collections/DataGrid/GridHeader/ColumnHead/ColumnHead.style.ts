import { cn } from '@/utils/utils'

export const cellOverflow = cn(
  'overflow-x-scroll text-left select-text [&::-webkit-scrollbar]:hidden',
)

export const closeIconState = cn(
  'group-hoverable:opacity-50 hover-device:opacity-0 opacity-50 transition-colors group-focus-visible:opacity-50',
)

export const filterMenuVisibility = cn(
  'group-hoverable:bg-transparent group-hoverable:opacity-50 hover-device:opacity-0 border-transparent opacity-50 transition-colors group-focus-visible:opacity-50 focus-visible:opacity-100',
)

export const alignColumn = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
}
