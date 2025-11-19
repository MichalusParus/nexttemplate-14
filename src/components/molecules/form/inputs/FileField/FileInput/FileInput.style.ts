import {
  errorStateClass,
  focusWithinVariant,
  interactiveVariant,
  paperVariant,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const fileInputWrapClass = cn(
  'flex w-full cursor-pointer items-center justify-center gap-6 overflow-hidden rounded-md border border-dashed transition-activity focus-within:ring-1 focus:outline-hidden',
  errorStateClass,
)

export const fileInputVariant = {
  text: {
    primary: cn(
      paperVariant.text.primary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.text.primary,
      focusWithinVariant.text.primary,
    ),
    secondary: cn(
      paperVariant.text.secondary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.text.secondary,
      focusWithinVariant.text.secondary,
    ),
    terciary: cn(
      paperVariant.text.terciary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.text.terciary,
      focusWithinVariant.text.terciary,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      paperVariant.outlined.primary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.outlined.primary,
      focusWithinVariant.outlined.primary,
    ),
    secondary: cn(
      paperVariant.outlined.secondary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.outlined.secondary,
      focusWithinVariant.outlined.secondary,
    ),
    terciary: cn(
      paperVariant.outlined.terciary,
      'bg-transparent dark:bg-transparent',
      interactiveVariant.outlined.terciary,
      focusWithinVariant.outlined.terciary,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      paperVariant.contained.primary,
      interactiveVariant.contained.primary,
      focusWithinVariant.contained.primary,
    ),
    secondary: cn(
      paperVariant.contained.secondary,
      interactiveVariant.contained.secondary,
      focusWithinVariant.contained.secondary,
    ),
    terciary: cn(
      paperVariant.contained.terciary,
      interactiveVariant.contained.terciary,
      focusWithinVariant.contained.terciary,
    ),
    none: '',
  },
}
