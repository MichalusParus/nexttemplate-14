import { cn } from '@/utils/utils'

export const arrowClass = cn('absolute top-1/2 translate-y-[-50%]')

export const chevronPosition = {
  sm: cn('mx-11 text-sm [&>.LeftChevronButton]:-left-11 [&>.RightChevronButton]:-right-11'),
  md: cn('mx-14 text-base [&>.LeftChevronButton]:-left-14 [&>.RightChevronButton]:-right-14'),
  lg: cn('mx-16 text-lg [&>.LeftChevronButton]:-left-16 [&>.RightChevronButton]:-right-16'),
  none: '',
}
