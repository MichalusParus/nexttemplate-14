import { cn } from '@/utils/utils'

export const rangeWrapClass = cn(
  'relative mb-1 inline-flex w-full items-center border border-transparent',
)

export const rangeClass = cn(
  'h-2 w-full cursor-pointer appearance-none rounded-lg bg-dark-950/25 disabled:shadow-none',
  '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
  'disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:disabled:bg-dark-500 [&::-webkit-slider-thumb]:disabled:bg-dark-500',
)

export const rangeColor = {
  primary: cn(
    '[&::-webkit-slider-thumb]:bg-primary-800 [&::-webkit-slider-thumb]:hover:bg-primary-900 [&::-webkit-slider-thumb]:active:bg-primary-700',
    '[&::-moz-range-thumb]:border-primary-800 [&::-moz-range-thumb]:bg-primary-800 [&::-moz-range-thumb]:hover:bg-primary-900 [&::-moz-range-thumb]:active:bg-primary-700',
    '[&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent',
  ),
  secondary: cn(
    '[&::-webkit-slider-thumb]:bg-secondary-800 [&::-webkit-slider-thumb]:active:bg-secondary-700 [&:::-webkit-slider-thumb]:hover:bg-secondary-900',
    '[&::-moz-range-thumb]:border-secondary-800 [&::-moz-range-thumb]:bg-secondary-800 [&::-moz-range-thumb]:hover:bg-secondary-900 [&::-moz-range-thumb]:active:bg-secondary-700',
    '[&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent',
  ),
  terciary: cn(
    '[&::-webkit-slider-thumb]:bg-terciary-800 [&::-webkit-slider-thumb]:hover:bg-terciary-900 [&::-webkit-slider-thumb]:active:bg-terciary-700',
    '[&::-moz-range-thumb]:border-terciary-800 [&::-moz-range-thumb]:bg-terciary-800 [&::-moz-range-thumb]:hover:bg-terciary-900 [&::-moz-range-thumb]:active:bg-terciary-700',
    '[&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent',
  ),
  none: '',
}

export const rangeSize = {
  sm: cn(
    'py-sm-y [&>::-moz-range-thumb]:h-sm-icon [&>::-moz-range-thumb]:w-sm-icon pr-sm-x',
    '[&>::-webkit-slider-thumb]:h-sm-icon [&>::-webkit-slider-thumb]:w-sm-icon',
  ),
  md: cn(
    '[&>::-moz-range-thumb]:h-md-icon [&>::-moz-range-thumb]:w-md-icon pr-md-x py-md-y',
    '[&>::-webkit-slider-thumb]:h-md-icon [&>::-webkit-slider-thumb]:w-md-icon',
  ),
  lg: cn(
    '[&>::-moz-range-thumb]:h-lg-icon [&>::-moz-range-thumb]:w-lg-icon py-lg-y pr-lg-x',
    '[&>::-webkit-slider-thumb]:h-lg-icon [&>::-webkit-slider-thumb]:w-lg-icon',
  ),
  none: '',
}
