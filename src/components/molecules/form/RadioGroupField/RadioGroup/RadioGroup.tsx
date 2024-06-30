'use client'
import { forwardRef, InputHTMLAttributes } from 'react'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import { afterClass, disableVariant, radioClass, radioSize, radioVariant } from './RadioGroup.style'
import { cn } from '@/utils/utils'

export type RadioGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type' | 'className' | 'name' | 'width'
> &
  Omit<LabelProps, 'name'> & {
    /** name of form field */
    name: string
    /** group options for individual radio inputs */
    options: { label: string; value: string }[]
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** display radio inputs in column */
    column?: boolean
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled RadioGroup inside Label Component. For form purposes use RadioGroupField. Default InputHTMLAttributes props supported. USE CLIENT */
export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      className = '',
      name,
      label,
      value,
      options,
      column,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      width,
      description,
      hideLabel,
      hideError,
      collapsed,
      disabled,
      error,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <Label
        className={className}
        name={name}
        label={label}
        size={size}
        width={width}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
        collapsed={collapsed}
        fakeLabel
      >
        <div
          className={cn('RadioGroupWrap', 'flex flex-wrap', column && 'flex-col')}
          role="radiogroup"
        >
          {options.map(({ value: radioValue, label: radioLabel }) => (
            <label
              key={radioValue}
              htmlFor={radioValue}
              className={cn('Label', 'relative flex items-center', radioSize[size])}
              data-testid="RadioLabel"
            >
              <input
                className={cn(
                  radioClass,
                  radioVariant[variant][color],
                  disableVariant[variant],
                  afterClass,
                  error && 'shadow-error',
                )}
                id={radioValue}
                name={name}
                type="radio"
                value={radioValue}
                onChange={e => onChange(e.target.value)}
                checked={Boolean(value === radioValue)}
                disabled={disabled}
                ref={ref}
                {...rest}
              />
              {radioLabel}
            </label>
          ))}
        </div>
      </Label>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
