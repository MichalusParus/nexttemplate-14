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
  'min-w-0 relative w-full rounded-md border transition-activity [&:has(input:focus-visible)]:ring-1 [&:has(textarea:focus-visible)]:ring-1',
  errorStateClass,
)

export const inputClass = cn(
  'focus:outline-hidden w-full appearance-none border-none bg-transparent font-semibold placeholder:text-placeholder disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden',
)

export const inputVariant = {
  text: {
    primary: cn(
      baseVariant.text.primary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.primary,
      interactiveVariant.text.primary,
    ),
    secondary: cn(
      baseVariant.text.secondary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.secondary,
      interactiveVariant.text.secondary,
    ),
    terciary: cn(
      baseVariant.text.terciary,
      'bg-transparent dark:bg-transparent',
      focusWithinVariant.text.terciary,
      interactiveVariant.text.terciary,
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
      focusWithinVariant.contained.primary,
      interactiveVariant.contained.primary,
    ),
    secondary: cn(
      baseVariant.contained.secondary,
      focusWithinVariant.contained.secondary,
      interactiveVariant.contained.secondary,
    ),
    terciary: cn(
      baseVariant.contained.terciary,
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
