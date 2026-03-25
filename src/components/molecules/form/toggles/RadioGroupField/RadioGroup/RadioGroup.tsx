'use client'
import { isEqual } from 'lodash'
import { FieldsetHTMLAttributes, ForwardedRef, forwardRef } from 'react'

import { devWarning } from '@/components/utils/devWarning'
import { InputProps, NativeInputProps, OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { afterClass, radioClass, radioDisabledVariant, radioSize, radioVariant } from './RadioGroup.style'

export type RadioGroupProps<T = string> = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'className' | 'color' | 'name' | 'onChange'> &
  Omit<InputProps, 'placeholder'> &
  StyleProps & {
    /** value of radiogroup */
    value?: T
    /** group options for individual radio inputs */
    options: OptionType<T>[]
    /** display radio inputs in column */
    column?: boolean
    /** optional radio props */
    radioProps?: Partial<Omit<NativeInputProps, 'checked' | 'onChange' | 'value' | 'name'>> & Pick<InputProps, 'className'>
    /** onChange function */
    onChange: (value: T) => void
  }

/** Basic styled uncontrolled RadioGroup. For form purposes use RadioGroupField. Native FieldsetHTMLAttributes and Radio props supported. USE CLIENT */
function RadioGroupComponent<T = string>(
  {
    className,
    name,
    value,
    options,
    column,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    error,
    disabled,
    radioProps = {},
    onChange,
    ...rest
  }: RadioGroupProps<T>,
  ref: ForwardedRef<HTMLFieldSetElement>,
) {
  const { className: radioClassName, ...restRadioProps } = radioProps

  devWarning(
    !rest['aria-label'] && !rest['aria-labelledby'],
    'RadioGroup: no aria-label or aria-labelledby provided — group has no accessible name. Use RadioGroupField or pass aria-label manually.',
  )

  return (
    <fieldset
      id={name}
      className={cn('RadioGroupWrap', 'flex flex-wrap', column && 'flex-col', className)}
      aria-disabled={disabled}
      ref={ref}
      {...rest}
    >
      {options.map(({ value: radioValue, label: radioLabel, content, isDisabled }, index) => (
        <div
          key={`${name}-${index}-${radioLabel}`}
          className={cn('Radio', 'relative flex items-start', radioSize[size], (disabled || isDisabled) && 'cursor-not-allowed [&_label]:text-dark-500')}
          data-testid="Radio"
        >
          <input
            id={`${name}-${index}`}
            className={cn(
              radioClass,
              radioVariant[variant][color],
              radioDisabledVariant[variant],
              afterClass,
              error && 'error',
              radioClassName,
            )}
            name={name}
            type="radio"
            value={String(index)}
            onChange={() => onChange(radioValue)}
            checked={Boolean(isEqual(value, radioValue))}
            disabled={disabled || isDisabled}
            {...restRadioProps}
          />
          <label
            id={`${name}-${index}-label`}
            htmlFor={`${name}-${index}`}
            className={cn('Label')}
            data-testid="Label"
          >
            {content || radioLabel}
          </label>
        </div>
      ))}
    </fieldset>
  )
}

type RadioGroupComponentType = {
  <T = string>(
    props: RadioGroupProps<T> & { ref?: ForwardedRef<HTMLFieldSetElement> },
  ): React.ReactElement | null
  displayName?: string
}

export const RadioGroup = forwardRef(RadioGroupComponent) as RadioGroupComponentType

RadioGroup.displayName = 'RadioGroup'
