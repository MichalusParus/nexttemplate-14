import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/utils/utils'

import Ghost from '../../loaders/Ghost'
import { PColor, PSize } from './P.style'

export type PProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'color' | 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** font size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** align tailwind class enum */
  align?: 'text-left' | 'text-center' | 'text-right'
  /** ghost loading state for heading */
  isLoading?: boolean
  /** expected lines for ghost template */
  expectedLines?: number
}

/** Basic paragraph component with ghost loading. Default HTMLAttributes props supported. */
export const P = forwardRef<HTMLParagraphElement, PropsWithChildren<PProps>>(
  (
    {
      className = '',
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
    const expectedArray = new Array(expectedLines).fill(null)

    return (
      <p
        className={cn('whitespace-pre-wrap', PColor[color], PSize[size], align, className)}
        data-testid="P"
        ref={ref}
        {...rest}
      >
        {isLoading
          ? expectedArray.map((_, index) => (
              <Ghost key={'pGhost' + index} className="float-left w-full" size={size} />
            ))
          : children}
      </p>
    )
  },
)

P.displayName = 'P'
