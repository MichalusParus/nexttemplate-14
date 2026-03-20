import { cn } from '@/utils/utils'

export const shadowClass = cn('absolute pointer-events-none from-inherit')

export const shadowPosition = {
  top: cn('top-0 left-0 bg-linear-to-b rounded-t-md'),
  bottom: cn('left-0 bg-linear-to-t rounded-b-md'),
  left: cn('top-0 left-0 bg-linear-to-r rounded-l-md'),
  right: cn('top-0 bg-linear-to-l rounded-r-md'),
}
