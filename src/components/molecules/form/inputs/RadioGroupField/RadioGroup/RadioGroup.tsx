'use client'
import { FieldsetHTMLAttributes, forwardRef, InputHTMLAttributes } from 'react'

import { InputProps, OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { inputErrorClass } from '../../TextField/TextInput/TextInput.style'
import { afterClass, disableVariant, radioClass, radioSize, radioVariant } from './RadioGroup.style'

type NativeRadioGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type' | 'name' | 'width' | 'value'
>

export type RadioGroupProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> &
  InputProps &
  StyleProps & {
    /** value of radiogroup */
    value?: string
    /** group options for individual radio inputs */
    options: OptionType[]
    /** display radio inputs in column */
    column?: boolean
    /** optional radio props */
    radioProps?: Partial<NativeRadioGroupProps>
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled RadioGroup. For form purposes use RadioGroupField. Default FieldsetHTMLAttributes and Radio props supported. USE CLIENT */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
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
      radioProps = {},
      onChange,
      ...rest
    },
    ref,
  ) => {
    const { className: radioClassName, ...restRadioProps } = radioProps

    return (
      <fieldset
        id={name}
        className={cn('RadioGroupWrap', 'flex flex-wrap', column && 'flex-col', className)}
        ref={ref}
        {...rest}
      >
        {options.map(({ value: radioValue, label: radioLabel, content }) => (
          <div
            key={radioValue}
            className={cn('Radio', 'relative flex items-center', radioSize[size])}
            data-testid="Radio"
          >
            <input
              id={radioValue}
              className={cn(
                radioClass,
                radioVariant[variant][color],
                disableVariant[variant],
                afterClass,
                error && 'error ' + inputErrorClass,
                radioClassName,
              )}
              name={name}
              type="radio"
              value={radioValue}
              onChange={e => onChange(e.target.value)}
              checked={Boolean(value === radioValue)}
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              {...restRadioProps}
            />
            <label
              id={`${radioValue}-label`}
              htmlFor={radioValue}
              className={cn('Label')}
              data-testid="Label"
            >
              {content || radioLabel}
            </label>
          </div>
        ))}
      </fieldset>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
