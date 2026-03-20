import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

import { textSize } from '@/components/utils/common.style'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Ghost, GhostProps } from '../../loaders/Ghost'
import { GhostAlign, PColor } from './P.style'

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
    /** optional ghost props for loading skeleton customization */
    ghostProps?: Partial<GhostProps>
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
      ghostProps = {},
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
          textSize[size],
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
              return <Ghost key={'pGhost' + index} style={{ width: skeletonWidth }} size={size} hideStatus {...ghostProps} />
            })
          : children}
      </p>
    )
  },
)

P.displayName = 'P'
