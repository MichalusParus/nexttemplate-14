import {
  errorStateClass,
  focusWithinVariant,
  interactiveVariant,
  paddingSize,
  paperVariant,
  textSize,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const inputWrapClass = cn(
  'relative w-full rounded-md border transition-activity [&:has(input:focus-visible)]:ring-1 [&:has(textarea:focus-visible)]:ring-1',
  errorStateClass,
)

export const inputClass = cn(
  'focus:outline-hidden w-full appearance-none border-none bg-transparent font-semibold placeholder:text-placeholder disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden',
)

export const inputVariant = {
  text: {
    primary: cn(
      paperVariant.text.primary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.primary,
      interactiveVariant.text.primary,
    ),
    secondary: cn(
      paperVariant.text.secondary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.secondary,
      interactiveVariant.text.secondary,
    ),
    terciary: cn(
      paperVariant.text.terciary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.terciary,
      interactiveVariant.text.terciary,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      paperVariant.outlined.primary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.outlined.primary,
      interactiveVariant.outlined.primary,
    ),
    secondary: cn(
      paperVariant.outlined.secondary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
    ),
    terciary: cn(
      paperVariant.outlined.terciary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.outlined.terciary,
      interactiveVariant.outlined.terciary,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      paperVariant.contained.primary,
      focusWithinVariant.contained.primary,
      interactiveVariant.contained.primary,
    ),
    secondary: cn(
      paperVariant.contained.secondary,
      focusWithinVariant.contained.secondary,
      interactiveVariant.contained.secondary,
    ),
    terciary: cn(
      paperVariant.contained.terciary,
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
