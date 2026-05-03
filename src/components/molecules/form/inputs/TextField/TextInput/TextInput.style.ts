import {
  baseVariant,
  errorStateClass,
  focusWithinVariant,
  interactiveVariant,
  paddingSize,
  textSize,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const inputWrapClass = cn(
  'text-text dark:text-contrast transition-activity relative flex w-full min-w-0 items-center gap-2 rounded-md border [&:has(input:focus-visible)]:ring-1 [&:has(textarea:focus-visible)]:ring-1',
  errorStateClass,
)

export const inputClass = cn(
  'placeholder:text-placeholder min-w-0 flex-1 appearance-none border-none bg-transparent font-normal focus:outline-hidden disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden',
)

export const inputVariant = {
  text: {
    primary: cn(
      baseVariant.text.primary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.primary,
      interactiveVariant.text.primary,
      "after:bg-primary-800 dark:after:bg-primary-400 after:absolute after:inset-x-1 after:-bottom-px after:h-0.5 after:rounded-full after:content-['']",
      '[&:has(input:focus-visible)]:ring-0 [&:has(textarea:focus-visible)]:ring-0',
    ),
    secondary: cn(
      baseVariant.text.secondary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.secondary,
      interactiveVariant.text.secondary,
      "after:bg-secondary-800 dark:after:bg-secondary-400 after:absolute after:inset-x-1 after:-bottom-px after:h-0.5 after:rounded-full after:content-['']",
      '[&:has(input:focus-visible)]:ring-0 [&:has(textarea:focus-visible)]:ring-0',
    ),
    terciary: cn(
      baseVariant.text.terciary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.terciary,
      interactiveVariant.text.terciary,
      "after:bg-terciary-800 dark:after:bg-terciary-400 after:absolute after:inset-x-1 after:-bottom-px after:h-0.5 after:rounded-full after:content-['']",
      '[&:has(input:focus-visible)]:ring-0 [&:has(textarea:focus-visible)]:ring-0',
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      baseVariant.outlined.primary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.outlined.primary,
      interactiveVariant.outlined.primary,
    ),
    secondary: cn(
      baseVariant.outlined.secondary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
    ),
    terciary: cn(
      baseVariant.outlined.terciary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.outlined.terciary,
      interactiveVariant.outlined.terciary,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      baseVariant.contained.primary,
      'text-contrast',
      focusWithinVariant.contained.primary,
      interactiveVariant.contained.primary,
    ),
    secondary: cn(
      baseVariant.contained.secondary,
      'text-contrast',
      focusWithinVariant.contained.secondary,
      interactiveVariant.contained.secondary,
    ),
    terciary: cn(
      baseVariant.contained.terciary,
      'text-contrast',
      focusWithinVariant.contained.terciary,
      interactiveVariant.contained.terciary,
    ),
    none: '',
  },
}

export const inputSize = {
  sm: cn(paddingSize.sm, textSize.sm),
  md: cn(paddingSize.md, textSize.md),
  lg: cn(paddingSize.lg, textSize.lg),
  none: '',
}
