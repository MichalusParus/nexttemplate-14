import { errorStateClass } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

export const linkClass = cn(
  'focus:outline-hidden relative cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-activity focus-visible:ring-1 focus-visible:z-10',
  errorStateClass,
)
