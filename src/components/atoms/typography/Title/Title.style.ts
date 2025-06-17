import { cn } from '@/utils/utils'

export const titleColor = {
  primary: cn('whitespace-pre-wrap text-primary-800 dark:text-primary-100'),
  secondary: cn('whitespace-pre-wrap text-secondary-800 dark:text-secondary-100'),
  terciary: cn('whitespace-pre-wrap text-terciary-800 dark:text-terciary-100'),
  none: '',
}

export const titleSize = {
  sm: cn('text-sm'),
  md: cn('text-base'),
  lg: cn('text-lg'),
  xl: cn('text-xl'),
  '2xl': cn('text-2xl'),
  '3xl': cn('text-3xl'),
  none: '',
}

export const ghostAligment = {
  left: cn(''),
  center: cn('ml-auto mr-auto'),
  right: cn('ml-auto'),
}
