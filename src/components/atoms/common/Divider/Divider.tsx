import { forwardRef } from 'react'

import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Span, SpanProps } from '../../typography/Span'
import { dividerColor, labelColor } from './Divider.style'

export type DividerProps = NativeDivProps & {
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
  /** when true, renders role="none" instead of role="separator" — use for purely visual dividers that should not be announced by screen readers */
  decorative?: boolean
  /** optional props for the label Span element */
  spanProps?: Partial<SpanProps>
}

/** Serves as visual divider with optional middle label. Native HTMLAttributes props supported. */
export const Divider = forwardRef<HTMLDivElement | null, DividerProps>(
  ({ className, label, width = 2, color = 'primary', vertical, decorative, spanProps = {}, ...rest }, ref) => {
    const dividerStyle = vertical
      ? { height: '100%', width: width }
      : { height: width, width: '100%' }
    const flexDirection = vertical ? 'min-h-full flex-col' : 'flex-row'
    const { className: spanClassName, ...restSpanProps } = spanProps

    const renderDividerLine = () => (
      <div
        className={`Divider rounded-full ${dividerColor[color]}`}
        style={dividerStyle}
        data-testid="Divider"
      />
    )

    return (
      <div
        className={cn(
          'DividerWrap',
          'flex items-center dark:text-inherit',
          flexDirection,
          className,
        )}
        role={decorative ? 'none' : 'separator'}
        ref={ref}
        {...(!decorative && { 'aria-orientation': vertical ? 'vertical' : 'horizontal' })}
        {...rest}
      >
        {renderDividerLine()}
        {label && (
          <>
            <Span
              className={cn(
                'DividerSpan',
                vertical ? 'my-2' : 'mx-4',
                labelColor[color],
                spanClassName,
              )}
              data-testid="DividerSpan"
              {...restSpanProps}
            >
              {label}
            </Span>
            {renderDividerLine()}
          </>
        )}
      </div>
    )
  },
)

Divider.displayName = 'Divider'
