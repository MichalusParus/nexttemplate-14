import { forwardRef, InputHTMLAttributes } from 'react'

import { Label } from '@/components/atoms/common/Label/Label'
import Span from '@/components/atoms/typography/Span'
import { FieldProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { rangeClass, rangeColor, rangeSize, rangeWrapClass } from './Range.style'

type NativeRangeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type' | 'className' | 'name' | 'width'
>

export type RangeProps = NativeRangeProps &
  FieldProps &
  Omit<StyleProps, 'variant'> & {
    /** value of range */
    value?: string
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled Range Input inside Label Component. For form purposes use RangeField. Default InputHTMLAttributes props supported. */
export const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    {
      className,
      name,
      label,
      color = 'primary',
      size = 'md',
      value,
      error,
      disabled,
      labelProps,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <div className={cn('RangeWrap', rangeWrapClass, rangeSize[size])}>
          <Span className={cn('ValueWrap', 'min-w-[3rem]', !value && 'opacity-0')}>
            {value || '0'}
          </Span>
          <input
            className={cn(
              rangeClass,
              rangeColor[color],
              error && 'border-error-800 shadow-error',
              className,
            )}
            id={name}
            type="range"
            name={name}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            aria-describedby={`${name}-description`}
            ref={ref}
            {...rest}
          />
        </div>
      </Label>
    )
  },
)

Range.displayName = 'Range'
