export const rangeWrapClass =
  'relative mb-1 inline-flex w-full items-center border border-transparent'

export const rangeClass =
  'h-2 w-full cursor-pointer appearance-none rounded-lg bg-dark-950 bg-opacity-20 ' +
  '[&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full ' +
  '[&::-webkit-slider-thumb]:disabled:bg-dark-500 [&::-moz-range-thumb]:disabled:bg-dark-500 disabled:cursor-not-allowed disabled:opacity-50'

export const rangeColor = {
  primary:
    '[&::-webkit-slider-thumb]:bg-primary-800 [&::-webkit-slider-thumb]:hover:bg-primary-900 [&::-webkit-slider-thumb]:active:bg-primary-700 [&::-webkit-slider-thumb]:shadow-button ' +
    '[&::-moz-range-thumb]:bg-primary-800 [&::-moz-range-thumb]:hover:bg-primary-900 [&::-moz-range-thumb]:active:bg-primary-700 [&::-moz-range-thumb]:border-primary-800 [&::-moz-range-thumb]:shadow-button ' +
    '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
  secondary:
    '[&::-webkit-slider-thumb]:bg-secondary-800 [&::-webkit-slider-thumb]:hover:bg-secondary-900 [&::-webkit-slider-thumb]:active:bg-secondary-700 [&::-webkit-slider-thumb]:shadow-button ' +
    '[&::-moz-range-thumb]:bg-secondary-800 [&::-moz-range-thumb]:hover:bg-secondary-900 [&::-moz-range-thumb]:active:bg-secondary-700 [&::-moz-range-thumb]:border-secondary-800 [&::-moz-range-thumb]:shadow-button ' +
    '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
  terciary:
    '[&::-webkit-slider-thumb]:bg-terciary-800 [&::-webkit-slider-thumb]:hover:bg-terciary-900 [&::-webkit-slider-thumb]:active:bg-terciary-700 [&::-webkit-slider-thumb]:shadow-button ' +
    '[&::-moz-range-thumb]:bg-terciary-800 [&::-moz-range-thumb]:hover:bg-terciary-900 [&::-moz-range-thumb]:active:bg-terciary-700 [&::-moz-range-thumb]:border-terciary-800 [&::-moz-range-thumb]:shadow-button ' +
    '[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent',
  none: '',
}

export const rangeSize = {
  sm: 'py-smPY px-smPX [&>::-webkit-slider-thumb]:w-smIcon [&>::-webkit-slider-thumb]:h-smIcon [&>::-moz-range-thumb]:w-smIcon [&>::-moz-range-thumb]:h-smIcon',
  md: 'py-mdPY px-mdPX [&>::-webkit-slider-thumb]:w-mdIcon [&>::-webkit-slider-thumb]:h-mdIcon [&>::-moz-range-thumb]:w-mdIcon [&>::-moz-range-thumb]:h-mdIcon',
  lg: 'py-lgPY px-lgPX [&>::-webkit-slider-thumb]:w-lgIcon [&>::-webkit-slider-thumb]:h-lgIcon [&>::-moz-range-thumb]:w-lgIcon> [&>::-moz-range-thumb]:h-lgIcon',
  none: '',
}
