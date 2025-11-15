import { cn } from '@/utils/utils'

export const comboboxClass = cn(
  'flex w-full items-center justify-between rounded-md border transition-colors focus:outline-hidden',
)

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
