import { cn } from '@/utils/utils'

export const rangeWrapClass = cn(
  'relative mb-1 inline-flex w-full items-center border border-transparent',
)

export const rangeClass = cn(
  'bg-dark-950/25 h-2 w-full cursor-pointer appearance-none rounded-lg',
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
    'px-smPX py-smPY [&>::-moz-range-thumb]:h-smIcon [&>::-moz-range-thumb]:w-smIcon',
    '[&>::-webkit-slider-thumb]:h-smIcon [&>::-webkit-slider-thumb]:w-smIcon',
  ),
  md: cn(
    'px-mdPX py-mdPY [&>::-moz-range-thumb]:h-mdIcon [&>::-moz-range-thumb]:w-mdIcon',
    '[&>::-webkit-slider-thumb]:h-mdIcon [&>::-webkit-slider-thumb]:w-mdIcon',
  ),
  lg: cn(
    '[&>::-moz-range-thumb]:w-lgIcon> px-lgPX py-lgPY [&>::-moz-range-thumb]:h-lgIcon',
    '[&>::-webkit-slider-thumb]:h-lgIcon [&>::-webkit-slider-thumb]:w-lgIcon',
  ),
  none: '',
}
