import { cn } from '@/utils/utils'

export const titleColor = {
  primary: cn('whitespace-pre-wrap text-primary-800 dark:text-primary-100'),
  secondary: cn('whitespace-pre-wrap text-secondary-800 dark:text-secondary-100'),
  terciary: cn('whitespace-pre-wrap text-terciary-800 dark:text-terciary-100'),
  none: '',
}

export const ghostAligment = {
  'text-left': cn(''),
  'text-center': cn('ml-auto mr-auto'),
  'text-right': cn('ml-auto'),
}
