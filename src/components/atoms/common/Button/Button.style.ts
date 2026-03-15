import {
  errorStateClass,
  focusVisibleVariant,
  iconPaddingSize,
  interactiveVariant,
  paddingSize,
  paperVariant,
  textSize,
} from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const buttonClass = cn(
  'focus:outline-hidden relative cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-activity focus-visible:ring-1 focus-visible:z-10',
  errorStateClass,
)

export const buttonVariant = {
  text: {
    primary: cn(
      paperVariant.text.primary,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.text.primary,
      interactiveVariant.text.primary,
    ),
    secondary: cn(
      paperVariant.text.secondary,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.text.secondary,
      interactiveVariant.text.secondary,
    ),
    terciary: cn(
      paperVariant.text.terciary,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.text.terciary,
      interactiveVariant.text.terciary,
    ),
    error: cn(
      paperVariant.text.error,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.text.error,
      interactiveVariant.text.error,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      paperVariant.outlined.primary,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.outlined.primary,
      interactiveVariant.outlined.primary,
    ),
    secondary: cn(
      paperVariant.outlined.secondary,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.outlined.secondary,
      interactiveVariant.outlined.secondary,
    ),
    terciary: cn(
      paperVariant.outlined.terciary,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.outlined.terciary,
      interactiveVariant.outlined.terciary,
    ),
    error: cn(
      paperVariant.outlined.error,
      'bg-transparent dark:bg-transparent',
      focusVisibleVariant.outlined.error,
      interactiveVariant.outlined.error,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      paperVariant.contained.primary,
      focusVisibleVariant.contained.primary,
      interactiveVariant.contained.primary,
    ),
    secondary: cn(
      paperVariant.contained.secondary,
      focusVisibleVariant.contained.secondary,
      interactiveVariant.contained.secondary,
    ),
    terciary: cn(
      paperVariant.contained.terciary,
      focusVisibleVariant.contained.terciary,
      interactiveVariant.contained.terciary,
    ),
    error: cn(
      paperVariant.contained.error,
      focusVisibleVariant.contained.error,
      interactiveVariant.contained.error,
    ),
    none: '',
  },
}

export const iconOnlySize = {
  sm: cn(iconPaddingSize.sm, textSize.sm),
  md: cn(iconPaddingSize.md, textSize.md),
  lg: cn(iconPaddingSize.lg, textSize.lg),
  inline: cn('border-0 px-1'),
  none: '',
}

export const buttonSize = {
  sm: cn(paddingSize.sm, textSize.sm),
  md: cn(paddingSize.md, textSize.md),
  lg: cn(paddingSize.lg, textSize.lg),
  inline: cn('border-0 px-1 hover:underline focus-visible:underline'),
  none: '',
}
