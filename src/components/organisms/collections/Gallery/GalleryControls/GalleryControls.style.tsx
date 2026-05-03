import { cn } from '@/utils/utils'

export const controlButtonClass = cn(
  'w-40 min-w-12 shrink-0 overflow-hidden border-none outline-offset-0 outline-transparent outline-solid focus-visible:outline-offset-0 [&[data-selected]]:outline-offset-0',
)

export const controlButtonVariant = {
  text: cn(
    'hover:outline-dark-950 focus-visible:outline-dark-950 [&[data-selected]]:outline-dark-950 ' +
      'dark:hover:outline-dark-50 dark:focus-visible:outline-dark-50 dark:[&[data-selected]]:outline-dark-50',
  ),
  outlined: cn(
    'hover:outline-dark-950 focus-visible:outline-dark-950 [&[data-selected]]:outline-dark-950 ' +
      'dark:hover:outline-dark-50 dark:focus-visible:outline-dark-50 dark:[&[data-selected]]:outline-dark-50',
  ),
  contained: cn(
    'hover:outline-dark-50 focus-visible:outline-dark-50 [&[data-selected]]:outline-dark-50',
  ),
  none: '',
}
