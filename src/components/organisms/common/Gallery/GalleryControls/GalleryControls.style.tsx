import { cn } from '@/utils/utils'

export const controlButtonClass = cn(
  'w-40 min-w-12 shrink-0 overflow-hidden border-none outline-solid outline-offset-0 outline-transparent focus-visible:outline-offset-0 [&.selected]:outline-offset-0',
)

export const controlButtonVariant = {
  text: cn(
    'hover:outline-dark-950 focus-visible:outline-dark-950 [&.selected]:outline-dark-950 ' +
      'dark:hover:outline-dark-50 dark:focus-visible:outline-dark-50 dark:[&.selected]:outline-dark-50',
  ),
  outlined: cn(
    'hover:outline-dark-950 focus-visible:outline-dark-950 [&.selected]:outline-dark-950 ' +
      'dark:hover:outline-dark-50 dark:focus-visible:outline-dark-50 dark:[&.selected]:outline-dark-50',
  ),
  contained: cn('hover:outline-dark-50 focus-visible:outline-dark-50 [&.selected]:outline-dark-50'),
  none: '',
}
