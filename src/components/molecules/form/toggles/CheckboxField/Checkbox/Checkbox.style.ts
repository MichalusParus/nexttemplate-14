import {
  errorStateClass,
  focusWithinVariant,
  interactiveVariant,
  paperVariant,
  toggleBaseBg,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const checkboxWrapClass = cn(
  'border shrink-0 cursor-pointer appearance-none overflow-hidden rounded-md transition-activity [&:has(input:focus-visible)]:ring-1 [&.disabled]:cursor-not-allowed',
  errorStateClass,
)

export const checkboxVariant = {
  text: {
    primary: cn(
      paperVariant.text.primary,
      toggleBaseBg,
      'group-hoverable:bg-primary-100 dark:group-hoverable:bg-primary-900',
      focusWithinVariant.text.primary,
      interactiveVariant.text.primary,
    ),
    secondary: cn(
      paperVariant.text.secondary,
      toggleBaseBg,
      'group-hoverable:bg-secondary-100 dark:group-hoverable:bg-secondary-900',
      focusWithinVariant.text.secondary,
      interactiveVariant.text.secondary,
    ),
    terciary: cn(
      paperVariant.text.terciary,
      toggleBaseBg,
      'group-hoverable:bg-terciary-100 dark:group-hoverable:bg-terciary-900',
      focusWithinVariant.text.terciary,
      interactiveVariant.text.terciary,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      paperVariant.outlined.primary,
      toggleBaseBg,
      'group-hoverable:bg-primary-100 dark:group-hoverable:bg-primary-900',
      focusWithinVariant.outlined.primary,
      interactiveVariant.outlined.primary,
    ),
    secondary: cn(
      paperVariant.outlined.secondary,
      toggleBaseBg,
      'group-hoverable:bg-secondary-100 dark:group-hoverable:bg-secondary-900',
      focusWithinVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
    ),
    terciary: cn(
      paperVariant.outlined.terciary,
      toggleBaseBg,
      'group-hoverable:bg-terciary-100 dark:group-hoverable:bg-terciary-900',
      focusWithinVariant.outlined.terciary,
      interactiveVariant.outlined.terciary,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      paperVariant.contained.primary,
      'group-hoverable:bg-primary-800',
      focusWithinVariant.contained.primary,
      interactiveVariant.contained.primary,
    ),
    secondary: cn(
      paperVariant.contained.secondary,
      'group-hoverable:bg-secondary-800',
      focusWithinVariant.contained.secondary,
      interactiveVariant.contained.secondary,
    ),
    terciary: cn(
      paperVariant.contained.terciary,
      'group-hoverable:bg-terciary-800',
      focusWithinVariant.contained.terciary,
      interactiveVariant.contained.terciary,
    ),
    none: '',
  },
}

export const checkIconDisabledVariant = {
  text: '[&.disabled]:text-dark-400',
  outlined: '[&.disabled]:text-dark-400',
  contained: '[&.disabled]:text-dark-200',
}

export const checkboxIconSize = {
  sm: 'h-sm-icon w-sm-icon',
  md: 'h-md-icon w-md-icon',
  lg: 'h-lg-icon w-lg-icon',
  none: '',
}

export const checkboxMargin = {
  sm: cn('mb-1 mr-3'),
  md: cn('mb-2 mr-4'),
  lg: cn('mb-3 mr-5'),
  none: '',
}
