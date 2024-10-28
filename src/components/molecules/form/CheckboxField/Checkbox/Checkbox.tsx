'use client'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { CheckIcon } from '@/components/atoms/icons'
import { FieldProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import {
  checkboxMargin,
  checkboxSize,
  checkboxVariant,
  checkClass,
  checkLabelSize,
  checkVariant,
  disabledVariant,
  inputClass,
  switchClass,
  switchLeft,
  switchSize,
  thumbClass,
} from './Checkbox.style'

type NativeCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type' | 'className' | 'name' | 'content' | 'width'
>

export type CheckboxProps = NativeCheckboxProps &
  FieldProps &
  Omit<StyleProps, 'variant'> & {
    /** style variant of component */
    variant?: StyleProps['variant'] | 'switch'
    /** optional element to display in label */
    content?: ReactNode
    /** optional checked status for Group use */
    isChecked: boolean
    /** error state */
    fake?: boolean
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled Checkbox. For form purposes use CheckboxField. Default InputHTMLAttributes props supported. USE CLIENT */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      name,
      label,
      content,
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
    const errorShadow = error ? 'shadow-error border-error-800' : ''
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
            checkLabelSize[size],
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
              checkboxSize[size],
              selectedClass,
              errorShadow,
            )}
          />
          <CheckIcon
            className={cn(
              'CheckIcon',
              checkClass,
              checkVariant[variant][color],
              checkboxSize[size],
              checkVisibility,
              disabledClass,
            )}
          />
        </div>
      )
    }

    if (variant === 'switch') {
      return (
        <div
          className={cn('SwitchWrap', 'flex items-start', checkboxMargin[size], className)}
          data-testid="Switch"
        >
          <div className={cn('relative mr-2 flex', switchSize[size])}>
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
          </div>
          <label htmlFor={name} className={cn('Label', 'group relative flex items-center')}>
            {content || label}
          </label>
        </div>
      )
    }

    return (
      <div
        className={cn('CheckboxWrap', 'flex items-start', checkboxMargin[size], className)}
        data-testid="Checkbox"
      >
        <div className="relative mr-2 flex">
          <input
            id={name}
            className={cn(
              inputClass,
              checkboxVariant[variant][color],
              disabledVariant[variant],
              checkboxSize[size],
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
              checkboxSize[size],
              checkVisibility,
              disabledClass,
            )}
          />
        </div>
        <label htmlFor={name} className={cn('Label', checkLabelSize[size])}>
          {content || label}
        </label>
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
