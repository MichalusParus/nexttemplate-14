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
  'text-text dark:text-contrast transition-activity relative mr-2 shrink-0 cursor-pointer appearance-none rounded-full border focus:outline-hidden focus-visible:ring',
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:focus-visible:ring-0',
  errorStateClass,
)

export const radioVariant = {
  text: {
    primary: cn(
      baseVariant.text.primary,
      toggleBaseBg,
      'after:bg-current',
      focusVisibleVariant.text.primary,
      interactiveVariant.text.primary,
      'checked:bg-primary-100 dark:checked:bg-primary-100/15',
      'hoverable:checked:bg-primary-200 dark:hoverable:checked:bg-primary-100/25',
    ),
    secondary: cn(
      baseVariant.text.secondary,
      toggleBaseBg,
      'after:bg-current',
      focusVisibleVariant.text.secondary,
      interactiveVariant.text.secondary,
      'checked:bg-secondary-100 dark:checked:bg-secondary-100/15',
      'hoverable:checked:bg-secondary-200 dark:hoverable:checked:bg-secondary-100/25',
    ),
    terciary: cn(
      baseVariant.text.terciary,
      toggleBaseBg,
      'after:bg-current',
      focusVisibleVariant.text.terciary,
      interactiveVariant.text.terciary,
      'checked:bg-terciary-100 dark:checked:bg-terciary-100/15',
      'hoverable:checked:bg-terciary-200 dark:hoverable:checked:bg-terciary-100/25',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      baseVariant.outlined.primary,
      toggleBaseBg,
      'after:bg-current',
      focusVisibleVariant.outlined.primary,
      interactiveVariant.outlined.primary,
      'checked:bg-primary-100 dark:checked:bg-primary-100/15',
      'hoverable:checked:bg-primary-200 dark:hoverable:checked:bg-primary-100/25',
    ),
    secondary: cn(
      baseVariant.outlined.secondary,
      toggleBaseBg,
      'after:bg-current',
      focusVisibleVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
      'checked:bg-secondary-100 dark:checked:bg-secondary-100/15',
      'hoverable:checked:bg-secondary-200 dark:hoverable:checked:bg-secondary-100/25',
    ),
    terciary: cn(
      baseVariant.outlined.terciary,
      toggleBaseBg,
      'after:bg-current',
      focusVisibleVariant.outlined.terciary,
      interactiveVariant.outlined.terciary,
      'checked:bg-terciary-100 dark:checked:bg-terciary-100/15',
      'hoverable:checked:bg-terciary-200 dark:hoverable:checked:bg-terciary-100/25',
    ),
    none: '',
  },
  contained: {
    primary: cn(
      baseVariant.contained.primary,
      'text-contrast',
      'after:bg-current',
      focusVisibleVariant.contained.primary,
      interactiveVariant.contained.primary,
      'checked:bg-primary-800',
      'hoverable:checked:bg-primary-900',
    ),
    secondary: cn(
      baseVariant.contained.secondary,
      'text-contrast',
      'after:bg-current',
      focusVisibleVariant.contained.secondary,
      interactiveVariant.contained.secondary,
      'checked:bg-secondary-800',
      'hoverable:checked:bg-secondary-900',
    ),
    terciary: cn(
      baseVariant.contained.terciary,
      'text-contrast',
      'after:bg-current',
      focusVisibleVariant.contained.terciary,
      interactiveVariant.contained.terciary,
      'checked:bg-terciary-800',
      'hoverable:checked:bg-terciary-900',
    ),
    none: '',
  },
}

export const afterClass = cn(
  'after:invisible after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full',
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
    'mr-3 mb-1',
    textSize.sm,
    '[&_input]:h-sm-icon [&_input]:w-sm-icon',
    '[&_input]:after:h-2 [&_input]:after:w-2',
  ),
  md: cn(
    'mr-4 mb-2',
    textSize.md,
    '[&_input]:h-sm-icon [&_input]:w-sm-icon md:[&_input]:h-md-icon md:[&_input]:w-md-icon',
    '[&_input]:after:h-2 [&_input]:after:w-2 md:[&_input]:after:h-2.5 md:[&_input]:after:w-2.5',
  ),
  lg: cn(
    'mr-5 mb-3',
    textSize.lg,
    '[&_input]:h-md-icon [&_input]:w-md-icon md:[&_input]:h-lg-icon md:[&_input]:w-lg-icon',
    '[&_input]:after:h-2.5 [&_input]:after:w-2.5 md:[&_input]:after:h-3 md:[&_input]:after:w-3',
  ),
  none: '',
}
