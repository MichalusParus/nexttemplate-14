import { errorStateClass,paperVariant, toggleBaseBg } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const toggleWrapClass = cn(
  'flex w-max justify-between rounded-md border',
  errorStateClass,
)

export const toggleVariant = {
  text: {
    primary: cn(
      paperVariant.text.primary,
      toggleBaseBg,
    ),
    secondary: cn(
      paperVariant.text.secondary,
      toggleBaseBg,
    ),
    terciary: cn(
      paperVariant.text.terciary,
      toggleBaseBg,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      paperVariant.outlined.primary,
      toggleBaseBg,
    ),
    secondary: cn(
      paperVariant.outlined.secondary,
      toggleBaseBg,
    ),
    terciary: cn(
      paperVariant.outlined.terciary,
      toggleBaseBg,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      paperVariant.contained.primary,
    ),
    secondary: cn(
      paperVariant.contained.secondary,
    ),
    terciary: cn(
      paperVariant.contained.terciary,
    ),
    none: '',
  },
}
