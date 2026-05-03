import {
  baseVariant,
  errorStateClass,
  focusWithinVariant,
  interactiveVariant,
  toggleBaseBg,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const checkboxWrapClass = cn(
  'text-text dark:text-contrast transition-activity shrink-0 cursor-pointer appearance-none overflow-hidden rounded-md border [&.disabled]:cursor-not-allowed [&:has(input:focus-visible)]:ring-1',
  errorStateClass,
)

export const checkboxVariant = {
  text: {
    primary: cn(
      baseVariant.text.primary,
      toggleBaseBg,
      'group-hoverable:bg-primary-100 dark:group-hoverable:bg-primary-100/10',
      'group-hoverable:[&[data-selected]]:bg-primary-200 dark:group-hoverable:[&[data-selected]]:bg-primary-100/25',
      focusWithinVariant.text.primary,
      interactiveVariant.text.primary,
    ),
    secondary: cn(
      baseVariant.text.secondary,
      toggleBaseBg,
      'group-hoverable:bg-secondary-100 dark:group-hoverable:bg-secondary-100/10',
      'group-hoverable:[&[data-selected]]:bg-secondary-200 dark:group-hoverable:[&[data-selected]]:bg-secondary-100/25',
      focusWithinVariant.text.secondary,
      interactiveVariant.text.secondary,
    ),
    terciary: cn(
      baseVariant.text.terciary,
      toggleBaseBg,
      'group-hoverable:bg-terciary-100 dark:group-hoverable:bg-terciary-100/10',
      'group-hoverable:[&[data-selected]]:bg-terciary-200 dark:group-hoverable:[&[data-selected]]:bg-terciary-100/25',
      focusWithinVariant.text.terciary,
      interactiveVariant.text.terciary,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      baseVariant.outlined.primary,
      toggleBaseBg,
      'group-hoverable:bg-primary-100 dark:group-hoverable:bg-primary-100/10',
      'group-hoverable:[&[data-selected]]:bg-primary-200 dark:group-hoverable:[&[data-selected]]:bg-primary-100/25',
      focusWithinVariant.outlined.primary,
      interactiveVariant.outlined.primary,
    ),
    secondary: cn(
      baseVariant.outlined.secondary,
      toggleBaseBg,
      'group-hoverable:bg-secondary-100 dark:group-hoverable:bg-secondary-100/10',
      'group-hoverable:[&[data-selected]]:bg-secondary-200 dark:group-hoverable:[&[data-selected]]:bg-secondary-100/25',
      focusWithinVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
    ),
    terciary: cn(
      baseVariant.outlined.terciary,
      toggleBaseBg,
      'group-hoverable:bg-terciary-100 dark:group-hoverable:bg-terciary-100/10',
      'group-hoverable:[&[data-selected]]:bg-terciary-200 dark:group-hoverable:[&[data-selected]]:bg-terciary-100/25',
      focusWithinVariant.outlined.terciary,
      interactiveVariant.outlined.terciary,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      baseVariant.contained.primary,
      'text-contrast',
      'group-hoverable:bg-primary-800',
      'group-hoverable:[&[data-selected]]:bg-primary-900',
      focusWithinVariant.contained.primary,
      interactiveVariant.contained.primary,
    ),
    secondary: cn(
      baseVariant.contained.secondary,
      'text-contrast',
      'group-hoverable:bg-secondary-800',
      'group-hoverable:[&[data-selected]]:bg-secondary-900',
      focusWithinVariant.contained.secondary,
      interactiveVariant.contained.secondary,
    ),
    terciary: cn(
      baseVariant.contained.terciary,
      'text-contrast',
      'group-hoverable:bg-terciary-800',
      'group-hoverable:[&[data-selected]]:bg-terciary-900',
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
  md: 'h-sm-icon w-sm-icon md:h-md-icon md:w-md-icon',
  lg: 'h-md-icon w-md-icon md:h-lg-icon md:w-lg-icon',
  none: '',
}

export const checkboxMargin = {
  sm: cn('mr-3 mb-1'),
  md: cn('mr-4 mb-2'),
  lg: cn('mr-5 mb-3'),
  none: '',
}
