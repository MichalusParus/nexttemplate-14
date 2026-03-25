import {
  baseVariant,
  errorStateClass,
  focusWithinVariant,
  interactiveVariant,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const fileInputWrapClass = cn(
  'flex w-full cursor-pointer items-center justify-center gap-6 overflow-hidden rounded-md border border-dashed transition-activity focus-within:ring-1 focus:outline-hidden',
  errorStateClass,
)

export const fileInputVariant = {
  text: {
    primary: cn(
      baseVariant.text.primary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.text.primary,
      focusWithinVariant.text.primary,
    ),
    secondary: cn(
      baseVariant.text.secondary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.text.secondary,
      focusWithinVariant.text.secondary,
    ),
    terciary: cn(
      baseVariant.text.terciary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.text.terciary,
      focusWithinVariant.text.terciary,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      baseVariant.outlined.primary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.outlined.primary,
      focusWithinVariant.outlined.primary,
    ),
    secondary: cn(
      baseVariant.outlined.secondary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.outlined.secondary,
      focusWithinVariant.outlined.secondary,
    ),
    terciary: cn(
      baseVariant.outlined.terciary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.outlined.terciary,
      focusWithinVariant.outlined.terciary,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      baseVariant.contained.primary,
      interactiveVariant.contained.primary,
      focusWithinVariant.contained.primary,
    ),
    secondary: cn(
      baseVariant.contained.secondary,
      interactiveVariant.contained.secondary,
      focusWithinVariant.contained.secondary,
    ),
    terciary: cn(
      baseVariant.contained.terciary,
      interactiveVariant.contained.terciary,
      focusWithinVariant.contained.terciary,
    ),
    none: '',
  },
}
