import { cn } from '@/utils/utils'

export const selectedClass = cn('absolute left-[1px] top-0 flex max-w-[70%] flex-wrap gap-1.5')

export const selectedSize = {
  sm: cn('mx-smPX my-smPY text-sm'),
  md: cn('mx-mdPX my-mdPY text-base'),
  lg: cn('mx-lgPX my-lgPY text-lg'),
  none: '',
}

export const iconSize = {
  sm: cn('h-smIcon w-smIcon min-w-smIcon'),
  md: cn('h-mdIcon w-mdIcon min-w-mdIcon'),
  lg: cn('h-lgIcon w-lgIcon min-w-lgIcon'),
  none: '',
}

export const checkboxSize = {
  sm: cn('[&>*]:h-5 [&>*]:w-5'),
  md: cn('[&>*]:h-6 [&>*]:w-6'),
  lg: cn('[&>*]:h-7 [&>*]:w-7'),
  none: '',
}
