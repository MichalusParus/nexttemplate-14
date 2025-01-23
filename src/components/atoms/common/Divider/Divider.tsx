import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Span } from '../../typography/Span'
import { dividerColor } from './Divider.style'

type NativeDividerProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color' | 'label'>

export type DividerProps = NativeDividerProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** for label in the middle of divider */
  label?: string
  /** theme color of component, none disable colors for custom styling via className */
  color?: StyleProps['color']
  /** thickness of divider, number in px or string css value */
  width?: number | string
  /** for vertical divider */
  vertical?: boolean
}

/** Serves as visual divider with optional middle label. Default HTMLAttributes props supported. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, label, color = 'primary', width = 2, vertical }, ref) => {
    const dividerStyle = vertical
      ? { height: '100%', width: width }
      : { height: width, width: '100%' }
    const flexDirection = vertical ? 'min-h-full flex-col' : 'flex-row'

    const renderDividerLine = () => (
      <div
        className={`Divider rounded-full ${dividerColor[color]}`}
        style={dividerStyle}
        data-testid="Divider"
      />
    )

    return (
      <div
        className={cn('DividerWrap', 'flex items-center', flexDirection, className)}
        role="separator"
        ref={ref}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
      >
        {renderDividerLine()}
        {label && (
          <>
            <Span className={vertical ? 'my-2' : 'mx-4'}>{label}</Span>
            {renderDividerLine()}
          </>
        )}
      </div>
    )
  },
)

Divider.displayName = 'Divider'
