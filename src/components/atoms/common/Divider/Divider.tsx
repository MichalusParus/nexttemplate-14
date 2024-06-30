import { forwardRef, HTMLAttributes } from 'react'

import Span from '../../typography/Span'
import { dividerColor } from './Divider.style'
import { cn } from '@/utils/utils'

export type DividerProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color' | 'label'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** for label in the middle of divider */
  label?: string
  /** theme color of component, none disable colors for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of divider, number in px */
  width?: number
  /** for vertical divider */
  vertical?: boolean
}

/** Serves as visual divider with optional middle label. Default HTMLAttributes props supported. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className = '', label, color = 'primary', width = 2, vertical }, ref) => {
    const dividerStyle = vertical
      ? { height: '100%', width: width }
      : { height: width, width: '100%' }
    const flexDirection = vertical ? 'min-h-full flex-col' : 'flex-row'

    return (
      <div
        className={cn('DividerWrap', 'flex items-center', flexDirection, className)}
        role="separator"
        ref={ref}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
      >
        <div
          className={`Divider rounded-full ${dividerColor[color]}`}
          style={dividerStyle}
          data-testid="Divider"
        />
        {label ? (
          <>
            <Span className={vertical ? 'my-2' : 'mx-4'}>{label}</Span>
            <div
              className={`Divider rounded-full ${dividerColor[color]}`}
              style={dividerStyle}
              data-testid="Divider"
            />
          </>
        ) : null}
      </div>
    )
  },
)

Divider.displayName = 'Divider'
