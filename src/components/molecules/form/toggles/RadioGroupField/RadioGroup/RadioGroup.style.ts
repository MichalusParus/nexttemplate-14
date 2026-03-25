import {
  baseVariant,
  errorStateClass,
  focusVisibleVariant,
  interactiveVariant,
  textSize,
  toggleBaseBg,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const radioClass = cn(
  'border relative mr-2 shrink-0 cursor-pointer appearance-none rounded-full transition-activity focus:outline-hidden focus-visible:ring',
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:focus-visible:ring-0',
  errorStateClass,
)

export const radioVariant = {
  text: {
    primary: cn(
      baseVariant.text.primary,
      toggleBaseBg,
      'after:bg-primary-800 dark:after:bg-primary-50',
      focusVisibleVariant.text.primary,
      interactiveVariant.text.primary,
      'checked:bg-primary-100 dark:checked:bg-primary-900',
    ),
    secondary: cn(
      baseVariant.text.secondary,
      toggleBaseBg,
      'after:bg-secondary-800 dark:after:bg-secondary-100',
      focusVisibleVariant.text.secondary,
      interactiveVariant.text.secondary,
      'checked:bg-secondary-100 dark:checked:bg-secondary-900',
    ),
    terciary: cn(
      baseVariant.text.terciary,
      toggleBaseBg,
      'after:bg-terciary-800 dark:after:bg-terciary-100',
      focusVisibleVariant.text.terciary,
      interactiveVariant.text.terciary,
      'checked:bg-terciary-100 dark:checked:bg-terciary-900',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      baseVariant.outlined.primary,
      toggleBaseBg,
      'after:bg-primary-800 dark:after:bg-primary-50',
      focusVisibleVariant.outlined.primary,
      interactiveVariant.outlined.primary,
      'checked:bg-primary-100 dark:checked:bg-primary-900',
    ),
    secondary: cn(
      baseVariant.outlined.secondary,
      toggleBaseBg,
      'after:bg-secondary-800 dark:after:bg-secondary-100',
      focusVisibleVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
      'checked:bg-secondary-100 dark:checked:bg-secondary-900',
    ),
    terciary: cn(
      baseVariant.outlined.terciary,
      toggleBaseBg,
      'after:bg-terciary-800 dark:after:bg-terciary-100',
      focusVisibleVariant.outlined.terciary,
      interactiveVariant.outlined.terciary,
      'checked:bg-terciary-100 dark:checked:bg-terciary-900',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      baseVariant.contained.primary,
      'after:bg-primary-50',
      focusVisibleVariant.contained.primary,
      interactiveVariant.contained.primary,
      'checked:bg-primary-800',
    ),
    secondary: cn(
      baseVariant.contained.secondary,
      'after:bg-secondary-50',
      focusVisibleVariant.contained.secondary,
      interactiveVariant.contained.secondary,
      'checked:bg-secondary-800',
    ),
    terciary: cn(
      baseVariant.contained.terciary,
      'after:bg-terciary-50',
      focusVisibleVariant.contained.terciary,
      interactiveVariant.contained.terciary,
      'checked:bg-terciary-800',
    ),
    none: '',
  },
}

export const afterClass = cn(
  'after:invisible after:absolute after:left-[50%] after:top-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full',
  'after:opacity-0 after:transition-opacity after:content-[""] checked:after:visible checked:after:opacity-100',
)

export const radioDisabledVariant = {
  text: cn(
    'disabled:bg-dark-200 disabled:text-dark-500 disabled:hover:bg-dark-200 disabled:after:bg-dark-400',
    'dark:disabled:bg-dark-200 dark:disabled:text-dark-500 dark:disabled:hover:bg-dark-200',
  ),
  outlined: cn(
    'disabled:border-dark-500 disabled:bg-dark-200 disabled:text-dark-500 disabled:hover:bg-dark-200 disabled:after:bg-dark-400',
    'dark:disabled:border-dark-500 dark:disabled:bg-dark-200 dark:disabled:text-dark-500 dark:disabled:hover:bg-dark-200',
  ),
  contained: cn(
    'disabled:border-dark-500 disabled:bg-dark-500 disabled:text-dark-300 disabled:hover:bg-dark-500 disabled:after:bg-dark-200',
  ),
}

export const radioSize = {
  sm: cn(
    'mb-1 mr-3',
    textSize.sm,
    '[&_input]:h-sm-icon [&_input]:w-sm-icon',
    '[&_input]:after:h-2 [&_input]:after:w-2',
  ),
  md: cn(
    'mb-2 mr-4',
    textSize.md,
    '[&_input]:h-md-icon [&_input]:w-md-icon',
    '[&_input]:after:h-2.5 [&_input]:after:w-2.5',
  ),
  lg: cn(
    'mb-3 mr-5',
    textSize.lg,
    '[&_input]:h-lg-icon [&_input]:w-lg-icon',
    '[&_input]:after:h-3 [&_input]:after:w-3',
  ),
  none: '',
}
