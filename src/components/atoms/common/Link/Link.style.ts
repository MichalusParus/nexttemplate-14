import { cn } from '@/utils/utils'

export const linkClass = cn(
  'flex items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-activity focus:outline-none [&.error]:border-error-800 [&.error]:shadow-error',
)
