import { forwardRef } from 'react'

import { Span } from '@/components/atoms/typography/Span'
import { InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import {
  rangeClass,
  rangeColor,
  rangeThumbSize,
  rangeWrapClass,
  rangeWrapFocusRing,
  rangeWrapSize,
} from './RangeInput.style'

export type RangeProps = NativeInputProps &
  InputProps &
  Omit<StyleProps, 'variant'> & {
    /** value of rangeInput */
    value?: number
    /** onChange function */
    onChange: (value: number) => void
  }

/** Basic styled uncontroled RangeInput. For form purposes use RangeField. Native InputHTMLAttributes props supported. */
export const RangeInput = forwardRef<HTMLInputElement | null, RangeProps>(
  (
    { className, name, value, color = 'primary', size = 'md', error, disabled, onChange, ...rest },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'RangeWrap',
          rangeWrapClass,
          rangeWrapSize[size],
          rangeWrapFocusRing[color],
          error && 'error',
          className,
        )}
        data-testid="RangeWrap"
      >
        <Span aria-hidden="true" className={cn('ValueWrap', 'min-w-12', value == null && 'opacity-0')}>
          {value ?? '0'}
        </Span>
        <input
          id={name}
          aria-orientation="horizontal"
          className={cn(
            rangeClass,
            rangeColor[color],
            rangeThumbSize[size],
            error && 'error',
          )}
          type="range"
          name={name}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)

RangeInput.displayName = 'RangeInput'
