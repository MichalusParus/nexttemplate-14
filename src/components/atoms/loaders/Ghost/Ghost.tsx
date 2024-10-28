import { useTranslations } from 'next-intl'
import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { ghostSize, ghostStyle } from './Ghost.style'

type NativeGhostProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>

export type GhostProps = NativeGhostProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** inline ghost size */
  size?: StyleProps['size'] | 'xl' | '2xl' | '3xl' | 'none'
}

/** Ghost is loading template for text, images, boxes and sections. Height and width must be set through className, for inline use theme heights. Default HTMLAttributes props supported. */
export const Ghost = forwardRef<HTMLSpanElement, GhostProps>(
  ({ className, size = 'none', ...rest }, ref) => {
    const t = useTranslations('Components')

    return (
      <span
        className={cn('Ghost', ghostStyle, ghostSize[size], className)}
        role="status"
        aria-label={t('loading')}
        aria-busy="true"
        ref={ref}
        {...rest}
      />
    )
  },
)

Ghost.displayName = 'Ghost'
