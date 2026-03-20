import { cn } from '@/utils/utils'

export const progressClass = cn('w-full overflow-hidden rounded-md border')

export const progressColor = {
  primary: cn('border-primary-800 bg-primary-200 [&>.Progress]:bg-primary-800'),
  secondary: cn('border-secondary-800 bg-secondary-200 [&>.Progress]:bg-secondary-800'),
  terciary: cn('border-terciary-800 bg-terciary-200 [&>.Progress]:bg-terciary-800'),
  none: '',
}
