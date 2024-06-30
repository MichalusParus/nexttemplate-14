import { cn } from '@/utils/utils'

export const shadowClass = cn('absolute from-inherit transition-opacity')

export const shadowPosition = {
  top: cn('top-0 h-6 w-[calc(100%-0.5rem)] bg-gradient-to-b'),
  right: cn('top-0 h-[calc(100%-0.5rem)] w-6 bg-gradient-to-l'),
  bottom: cn('h-6 w-[calc(100%-0.5rem)] bg-gradient-to-t'),
  left: cn('-left-0 top-0 h-[calc(100%-0.5rem)] w-6 bg-gradient-to-r'),
}
