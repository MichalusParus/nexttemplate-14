import { cn } from '@/utils/utils'

export const titleColor = {
  primary: cn('whitespace-pre-wrap text-primary-800'),
  secondary: cn('whitespace-pre-wrap text-secondary-800'),
  terciary: cn('whitespace-pre-wrap text-terciary-800'),
  none: '',
}

export const titleSize = {
  sm: cn('w-full text-sm font-semibold'),
  md: cn('w-full text-base font-semibold'),
  lg: cn('w-full text-lg font-semibold'),
  xl: cn('w-full text-xl font-semibold'),
  '2xl': cn('w-full text-2xl font-semibold'),
  '3xl': cn('w-full text-3xl font-semibold'),
  none: '',
}

export const ghostAligment = {
  left: cn(''),
  center: cn('mx-auto'),
  right: cn('ml-auto'),
}
