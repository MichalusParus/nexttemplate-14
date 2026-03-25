import { baseVariant, errorStateClass,toggleBaseBg } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const toggleWrapClass = cn(
  'flex w-max justify-between rounded-md border',
  errorStateClass,
)

export const toggleVariant = {
  text: {
    primary: cn(
      baseVariant.text.primary,
      toggleBaseBg,
    ),
    secondary: cn(
      baseVariant.text.secondary,
      toggleBaseBg,
    ),
    terciary: cn(
      baseVariant.text.terciary,
      toggleBaseBg,
    ),
    none: '',
  },
  outlined: {
    primary: cn(
      baseVariant.outlined.primary,
      toggleBaseBg,
    ),
    secondary: cn(
      baseVariant.outlined.secondary,
      toggleBaseBg,
    ),
    terciary: cn(
      baseVariant.outlined.terciary,
      toggleBaseBg,
    ),
    none: '',
  },
  contained: {
    primary: cn(
      baseVariant.contained.primary,
    ),
    secondary: cn(
      baseVariant.contained.secondary,
    ),
    terciary: cn(
      baseVariant.contained.terciary,
    ),
    none: '',
  },
}
