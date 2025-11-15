import { forwardRef } from 'react'

import { Span } from '@/components/atoms/typography/Span'
import { InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { inputErrorClass } from '../../TextField/TextInput/TextInput.style'
import { rangeClass, rangeColor, rangeSize, rangeWrapClass } from './RangeInput.style'

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
    { className, name, color = 'primary', size = 'md', value, error, disabled, onChange, ...rest },
    ref,
  ) => {
    return (
      <div
        className={cn('RangeWrap', rangeWrapClass, rangeSize[size], className)}
        data-testid="RangeWrap"
      >
        <Span className={cn('ValueWrap', 'min-w-12', !value && 'opacity-0')}>
          {value || '0'}
        </Span>
        <input
          id={name}
          className={cn(
            rangeClass,
            rangeColor[color],
            error && !disabled && 'error ' + inputErrorClass,
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
