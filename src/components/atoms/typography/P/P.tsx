import { forwardRef, HTMLAttributes, ReactNode } from 'react'

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
  /** children */
  children?: ReactNode
}

/** Basic paragraph component with ghost loading. Default HTMLAttributes props supported. */
export const P = forwardRef<HTMLParagraphElement, PProps>(
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
        className={`${className} whitespace-pre-wrap ${PColor[color]} ${PSize[size]} ${align}`}
        data-testid="P"
        ref={ref}
        {...rest}
      >
        {isLoading
          ? expectedArray.map((line, index) => (
              <Ghost key={'pGhost' + index} className="float-left w-full" size={size} />
            ))
          : children}
      </p>
    )
  },
)

P.displayName = 'P'
