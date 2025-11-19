import {
  errorStateClass,
  focusVisibleVariant,
  interactiveVariant,
  paperVariant,
  textSize,
  toggleBaseBg,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const radioClass = cn(
  'border relative mr-2 shrink-0 cursor-pointer appearance-none rounded-full transition-activity focus:outline-hidden focus-visible:ring',
  errorStateClass,
)

export const radioVariant = {
  text: {
    primary: cn(
      paperVariant.text.primary,
      toggleBaseBg,
      'after:bg-primary-800 dark:after:bg-primary-50',
      focusVisibleVariant.text.primary,
      interactiveVariant.text.primary,
      'checked:bg-primary-100 dark:checked:bg-primary-900',
    ),
    secondary: cn(
      paperVariant.text.secondary,
      toggleBaseBg,
      'after:bg-secondary-800 dark:after:bg-secondary-100',
      focusVisibleVariant.text.secondary,
      interactiveVariant.text.secondary,
      'checked:bg-secondary-100 dark:checked:bg-secondary-900',
    ),
    terciary: cn(
      paperVariant.text.terciary,
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
      paperVariant.outlined.primary,
      toggleBaseBg,
      'after:bg-primary-800 dark:after:bg-primary-50',
      focusVisibleVariant.outlined.primary,
      interactiveVariant.outlined.primary,
      'checked:bg-primary-100 dark:checked:bg-primary-900',
    ),
    secondary: cn(
      paperVariant.outlined.secondary,
      toggleBaseBg,
      'after:bg-secondary-800 dark:after:bg-secondary-100',
      focusVisibleVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
      'checked:bg-secondary-100 dark:checked:bg-secondary-900',
    ),
    terciary: cn(
      paperVariant.outlined.terciary,
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
      paperVariant.contained.primary,
      'after:bg-primary-50',
      focusVisibleVariant.contained.primary,
      interactiveVariant.contained.primary,
      'checked:bg-primary-800',
    ),
    secondary: cn(
      paperVariant.contained.secondary,
      'after:bg-secondary-50',
      focusVisibleVariant.contained.secondary,
      interactiveVariant.contained.secondary,
      'checked:bg-secondary-800',
    ),
    terciary: cn(
      paperVariant.contained.terciary,
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
  'after:opacity-0 after:transition-opacity after:content-[""] checked:after:visible checked:after:opacity-100 disabled:after:bg-dark-500',
)

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
