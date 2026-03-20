import { errorStateClass } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

// bg-dark-500/10 dark:bg-dark-950/20
const toggleBaseBg = 'bg-dark-500/10 dark:bg-dark-950/20'

export const rangeWrapClass = cn(
  'relative mb-1 inline-flex w-full items-center rounded-md border border-transparent transition-activity [&:has(input:focus-visible)]:ring-1',
  errorStateClass,
)

export const rangeClass = cn(
  'h-2 w-full cursor-pointer appearance-none rounded-lg disabled:shadow-none focus:outline-hidden',
  toggleBaseBg,
  '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
  'disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:disabled:bg-dark-500 [&::-webkit-slider-thumb]:disabled:bg-dark-500',
)

export const rangeColor = {
  primary: cn(
    '[&::-webkit-slider-thumb]:bg-primary-700',
    '[&::-webkit-slider-thumb]:hoverable:bg-primary-800',
    '[&::-webkit-slider-thumb]:active:bg-primary-900',
    '[&::-moz-range-thumb]:border-primary-700 [&::-moz-range-thumb]:bg-primary-700',
    '[&::-moz-range-thumb]:hoverable:bg-primary-800',
    '[&::-moz-range-thumb]:active:bg-primary-900',
    '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
  ),
  secondary: cn(
    '[&::-webkit-slider-thumb]:bg-secondary-700',
    '[&::-webkit-slider-thumb]:hoverable:bg-secondary-800',
    '[&::-webkit-slider-thumb]:active:bg-secondary-900',
    '[&::-moz-range-thumb]:border-secondary-700 [&::-moz-range-thumb]:bg-secondary-700',
    '[&::-moz-range-thumb]:hoverable:bg-secondary-800',
    '[&::-moz-range-thumb]:active:bg-secondary-900',
    '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
  ),
  terciary: cn(
    '[&::-webkit-slider-thumb]:bg-terciary-700',
    '[&::-webkit-slider-thumb]:hoverable:bg-terciary-800',
    '[&::-webkit-slider-thumb]:active:bg-terciary-900',
    '[&::-moz-range-thumb]:border-terciary-700 [&::-moz-range-thumb]:bg-terciary-700',
    '[&::-moz-range-thumb]:hoverable:bg-terciary-800',
    '[&::-moz-range-thumb]:active:bg-terciary-900',
    '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
  ),
  none: '',
}

export const rangeWrapSize = {
  sm: 'py-sm-y pr-sm-x',
  md: 'py-md-y pr-md-x',
  lg: 'py-lg-y pr-lg-x',
  none: '',
}

export const rangeThumbSize = {
  sm: cn(
    '[&::-moz-range-thumb]:h-sm-icon [&::-moz-range-thumb]:w-sm-icon',
    '[&::-webkit-slider-thumb]:h-sm-icon [&::-webkit-slider-thumb]:w-sm-icon',
  ),
  md: cn(
    '[&::-moz-range-thumb]:h-md-icon [&::-moz-range-thumb]:w-md-icon',
    '[&::-webkit-slider-thumb]:h-md-icon [&::-webkit-slider-thumb]:w-md-icon',
  ),
  lg: cn(
    '[&::-moz-range-thumb]:h-lg-icon [&::-moz-range-thumb]:w-lg-icon',
    '[&::-webkit-slider-thumb]:h-lg-icon [&::-webkit-slider-thumb]:w-lg-icon',
  ),
  none: '',
}

export const rangeWrapFocusRing = {
  primary: cn(
    '[&:has(input:focus-visible)]:ring-primary-800',
    'dark:[&:has(input:focus-visible)]:ring-primary-100',
  ),
  secondary: cn(
    '[&:has(input:focus-visible)]:ring-secondary-800',
    'dark:[&:has(input:focus-visible)]:ring-secondary-100',
  ),
  terciary: cn(
    '[&:has(input:focus-visible)]:ring-terciary-800',
    'dark:[&:has(input:focus-visible)]:ring-terciary-100',
  ),
  none: '',
}
