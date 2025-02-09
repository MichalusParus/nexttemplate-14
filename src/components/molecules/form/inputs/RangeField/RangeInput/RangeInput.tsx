import { forwardRef, InputHTMLAttributes } from 'react'

import { Span } from '@/components/atoms/typography/Span'
import { InputProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { inputErrorClass } from '../../TextField/TextInput/TextInput.style'
import { rangeClass, rangeColor, rangeSize, rangeWrapClass } from './RangeInput.style'

type NativeRangeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type' | 'className' | 'name' | 'width' | 'value'
> &
  InputProps

export type RangeProps = NativeRangeProps &
  InputProps &
  Omit<StyleProps, 'variant'> & {
    /** value of rangeInput */
    value?: string
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled RangeInput. For form purposes use RangeField. Default InputHTMLAttributes props supported. */
export const RangeInput = forwardRef<HTMLInputElement, RangeProps>(
  (
    { className, name, color = 'primary', size = 'md', value, error, disabled, onChange, ...rest },
    ref,
  ) => {
    return (
      <div
        className={cn('RangeWrap', rangeWrapClass, rangeSize[size], className)}
        data-testid="RangeWrap"
      >
        <Span className={cn('ValueWrap', 'min-w-[3rem]', !value && 'opacity-0')}>
          {value || '0'}
        </Span>
        <input
          id={name}
          className={cn(rangeClass, rangeColor[color], error && 'error ' + inputErrorClass)}
          type="range"
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)

RangeInput.displayName = 'RangeInput'
