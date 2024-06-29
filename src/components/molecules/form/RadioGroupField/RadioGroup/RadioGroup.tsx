import { forwardRef, InputHTMLAttributes } from 'react'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import { afterClass, disableVariant, radioClass, radioSize, radioVariant } from './RadioGroup.style'

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

/** Basic styled RadioGroup inside Label Component. For form purposes use RadioGroupField. Default InputHTMLAttributes props supported. */
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
    const errorShadow = error ? 'shadow-error' : ''
    const flexDirection = column ? 'flex-col' : ''

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
        <div className={`RadioGroupWrap flex flex-wrap ${flexDirection}`} role="radiogroup">
          {options.map(({ value: radioValue, label: radioLabel }) => (
            <label
              key={radioValue}
              htmlFor={radioValue}
              className={`relative flex items-center ${radioSize[size]}`}
              data-testid="RadioLabel"
            >
              <input
                className={`${radioClass} ${radioVariant[variant][color]} ${disableVariant[variant]} ${afterClass} ${errorShadow}`}
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
