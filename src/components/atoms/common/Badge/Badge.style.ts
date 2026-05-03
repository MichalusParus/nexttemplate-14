import { cn } from '@/utils/utils'

// Default: red. Override color via consumer className. Override position via `position` prop on Badge.
export const badgeClass = cn(
  'absolute z-10 flex items-center justify-center rounded-full font-semibold leading-none',
  'pointer-events-none select-none',
  'bg-error-700 text-error-50',
)

// Sizes for the dot-only mode (no value) — small circle
export const badgeDotSize = {
  sm: cn('h-2 w-2'),
  md: cn('h-2.5 w-2.5'),
  lg: cn('h-3 w-3'),
  none: '',
}

// Sizes for the value mode (number/text) — pill with min width to stay circular for single digit
export const badgeValueSize = {
  sm: cn('h-3.5 min-w-3.5 px-1 text-[0.625rem]'),
  md: cn('h-4 min-w-4 px-1 text-[0.6875rem]'),
  lg: cn('h-5 min-w-5 px-1.5 text-xs'),
  none: '',
}
