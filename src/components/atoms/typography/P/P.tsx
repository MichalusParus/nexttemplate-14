import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Ghost } from '../../loaders/Ghost'
import { GhostAlign, PColor, PSize } from './P.style'

type NativePProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'color' | 'className'>

export type PProps = NativePProps &
  Pick<StyleProps, 'color'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** font size of component, none disable sizes for custom styling via className */
    size?: StyleProps['size'] | 'xl' | '2xl' | '3xl'
    /** align tailwind class enum */
    align?: 'text-left' | 'text-center' | 'text-right'
    /** ghost loading state for heading */
    isLoading?: boolean
    /** expected lines for ghost template */
    expectedLines?: number
  }

/** Basic paragraph component with ghost loading. Native HTMLAttributes props supported. */
export const P = forwardRef<HTMLParagraphElement | null, PropsWithChildren<PProps>>(
  (
    {
      className,
      color = 'none',
      size = 'md',
      align = 'text-left',
      isLoading,
      expectedLines = 1,
      children,
      ...rest
    },
    ref,
  ) => {
    const expectedArray = Array.from({ length: expectedLines }, (_, i) => i)

    return (
      <p
        className={cn(
          'whitespace-pre-wrap',
          PColor[color],
          PSize[size],
          align,
          isLoading && 'flex flex-col ' + GhostAlign[align],
          className,
        )}
        data-testid="P"
        ref={ref}
        {...rest}
      >
        {isLoading
          ? expectedArray.map((_, index) => {
              const skeletonWidth = `${80 + Math.floor(Math.abs(Math.sin(index) * 10000) % 20)}%`
              return <Ghost key={'pGhost' + index} style={{ width: skeletonWidth }} size={size} />
            })
          : children}
      </p>
    )
  },
)

P.displayName = 'P'
