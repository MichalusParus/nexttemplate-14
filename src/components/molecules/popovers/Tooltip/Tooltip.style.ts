import { cn } from '@/utils/utils'

export const tooltipClass = cn(
  'shadow-paper rounded-md bg-dark-500 px-smPX py-smPY text-sm text-dark-100',
)

export const tooltipPosition = {
  top: cn('absolute bottom-full left-[50%] translate-x-[-50%]'),
  right: cn('absolute left-full top-[50%] translate-y-[-50%]'),
  bottom: cn('absolute left-[50%] top-full translate-x-[-50%]'),
  left: cn('absolute right-full top-[50%] translate-y-[-50%]'),
}

export const tooltipVisibility = cn(
  'invisible scale-75 opacity-0 transition-dropdown',
  'hover:visible hover:scale-100 hover:opacity-100',
  'group-hover/tooltip:visible group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100',
  'group-focus-within/tooltip:visible group-focus-within/tooltip:scale-100 group-focus-within/tooltip:opacity-100',
)
