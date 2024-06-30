'use client'
import { forwardRef, InputHTMLAttributes } from 'react'

import CheckIcon from '@/components/atoms/icons/CheckIcon'

import {
  checkboxMargin,
  checkboxSize,
  checkboxVariant,
  checkClass,
  checkVariant,
  disabledVariant,
  inputClass,
  switchClass,
  switchLeft,
  switchSize,
  thumbClass,
} from './Checkbox.style'
import { cn } from '@/utils/utils'

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type' | 'className' | 'name'
> & {
  /** for passing custom tailwind classes */
  className?: string
  /** name of form field */
  name: string
  /** text content of label */
  label: string
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained' | 'switch'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** optional checked status for Group use */
  isChecked: boolean
  /** error state */
  error?: string
  /** for return fake styled checkbox without input */
  fake?: boolean
  /** onChange function */
  onChange: (value: string) => void
}

/** Basic styled Checkbox. For form purposes use CheckboxField. Default InputHTMLAttributes props supported. . USE CLIENT */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className = '',
      name,
      label,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isChecked,
      error,
      fake,
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const errorShadow = error ? 'shadow-error' : ''
    const checkVisibility = isChecked || disabled ? 'visible opacity-100' : 'invisible opacity-0'
    const thumbPosition = isChecked || disabled ? switchLeft[size] : 'left-0'
    const disabledClass = disabled ? 'disabled' : ''
    const selectedClass = isChecked ? 'selected' : ''

    if (fake) {
      return (
        <div
          className={cn(
            'FakeCheckboxWrap',
            'relative flex items-center',
            checkboxSize[size],
            className,
          )}
          data-testid="FakeCheckboxWrap"
        >
          <div
            className={cn(
              'FakeInput',
              inputClass,
              checkboxVariant[variant][color],
              disabledClass,
              disabledVariant[variant],
              selectedClass,
              errorShadow,
            )}
          />
          <CheckIcon
            className={cn(
              'CheckIcon',
              checkClass,
              checkVariant[variant][color],
              checkVisibility,
              disabledClass,
            )}
          />
          {label}
        </div>
      )
    }

    if (variant === 'switch') {
      return (
        <label
          className={cn(
            'Label',
            'group relative flex items-center',
            switchSize[size],
            checkboxMargin[size],
            className,
          )}
          data-testid="SwitchLabel"
        >
          <input
            id={name}
            className={cn(
              switchClass,
              checkboxVariant[variant][color],
              disabledVariant[variant],
              errorShadow,
            )}
            type="checkbox"
            name={name}
            value={value}
            onChange={e => onChange(e.target.value)}
            checked={isChecked}
            disabled={disabled}
            ref={ref}
            {...rest}
          />
          <div
            className={cn(
              'SwitchThumb',
              thumbClass,
              checkVariant[variant][color],
              thumbPosition,
              disabledClass,
            )}
            data-testid="SwitchThumb"
          />
          {label}
        </label>
      )
    }

    return (
      <label
        className={cn(
          'Label',
          'relative flex items-center',
          checkboxSize[size],
          checkboxMargin[size],
          className,
        )}
        data-testid="CheckboxLabel"
      >
        <input
          id={name}
          className={cn(
            'mr-2',
            inputClass,
            checkboxVariant[variant][color],
            disabledVariant[variant],
            errorShadow,
          )}
          type="checkbox"
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          checked={isChecked}
          disabled={disabled}
          ref={ref}
          {...rest}
        />
        <CheckIcon
          className={cn(
            'CheckIcon',
            checkClass,
            checkVariant[variant][color],
            checkVisibility,
            disabledClass,
          )}
        />
        {label}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
