'use client'
import { forwardRef, InputHTMLAttributes } from 'react'

import { InputProps, OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { afterClass, disableVariant, radioClass, radioSize, radioVariant } from './RadioGroup.style'

type NativeRadioGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type' | 'className' | 'name' | 'width' | 'value'
>

export type RadioGroupProps = NativeRadioGroupProps &
  InputProps &
  StyleProps & {
    /** value of radiogroup */
    value?: string
    /** group options for individual radio inputs */
    options: OptionType[]
    /** display radio inputs in column */
    column?: boolean
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled RadioGroup. For form purposes use RadioGroupField. Default InputHTMLAttributes props supported. USE CLIENT */
export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      className,
      name,
      value,
      options,
      column,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      error,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn('RadioGroupWrap', 'flex flex-wrap', column && 'flex-col', className)}
        role="radiogroup"
      >
        {options.map(({ value: radioValue, label: radioLabel, content }) => (
          <div
            key={radioValue}
            className={cn('Radio', 'relative flex items-center', radioSize[size])}
            data-testid="Radio"
          >
            <input
              className={cn(
                radioClass,
                radioVariant[variant][color],
                disableVariant[variant],
                afterClass,
                error && 'border-error-800 shadow-error',
              )}
              id={radioValue}
              name={name}
              type="radio"
              value={radioValue}
              onChange={e => onChange(e.target.value)}
              checked={Boolean(value === radioValue)}
              aria-describedby={`${name}-description`}
              disabled={disabled}
              ref={ref}
              {...rest}
            />
            <label htmlFor={radioValue} className={cn('Label')}>
              {content || radioLabel}
            </label>
          </div>
        ))}
      </div>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
