import { cn } from '@/utils/utils'

export const comboboxWrapClass = cn('w-full rounded-md border transition-colors')

export const disabledVariant = {
  text: cn(
    '[&.disabled]:cursor-not-allowed [&.disabled]:bg-dark-200 [&.disabled]:text-dark-500 [&.disabled]:opacity-50',
  ),
  outlined: cn(
    '[&.disabled]:cursor-not-allowed [&.disabled]:border-dark-500 [&.disabled]:bg-dark-200 [&.disabled]:text-dark-500 [&.disabled]:opacity-50',
  ),
  contained: cn(
    '[&.disabled]:cursor-not-allowed [&.disabled]:border-dark-500 [&.disabled]:bg-dark-500 [&.disabled]:text-dark-300 [&.disabled]:opacity-50',
  ),
}

export const clearButtonClass = cn(
  'right-11 top-1/2 z-10 -translate-y-1/2 border-0 [&.ClearButton]:absolute',
)

export const chevronClass = cn(
  'absolute right-4 top-1/2 -translate-y-1/2 text-inherit transition-transform',
)
