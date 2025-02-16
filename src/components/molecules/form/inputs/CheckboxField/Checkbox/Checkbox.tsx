'use client'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { CheckIcon } from '@/components/atoms/icons'
import { FieldProps, InputProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { inputErrorClass } from '../../TextField/TextInput/TextInput.style'
import {
  checkboxMargin,
  checkboxSize,
  checkboxVariant,
  checkLabelSize,
  checkVariant,
  disabledVariant,
  inputWrapClass,
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
  Pick<FieldProps, 'label'> &
  InputProps &
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
    const checkVisibility = isChecked || disabled ? 'opacity-100' : 'opacity-0'
    const thumbPosition = isChecked || disabled ? switchLeft[size] : 'left-0'
    console.log(isChecked)

    if (variant === 'switch') {
      return (
        <div
          className={cn('SwitchWrap', 'flex items-start', checkboxMargin[size], className)}
          data-testid="SwitchWrap"
        >
          <div className={cn('relative mr-2 flex', switchSize[size])}>
            <input
              id={name}
              className={cn(
                switchClass,
                checkboxVariant[variant][color],
                disabledVariant[variant],
                error && 'error ' + inputErrorClass,
              )}
              type="checkbox"
              name={name}
              value={value}
              onChange={e => onChange(e.target.value)}
              checked={isChecked}
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              ref={ref}
              {...rest}
            />
            <div
              className={cn(
                'SwitchThumb',
                disabled && 'disabled',
                thumbClass,
                checkVariant[variant][color],
                thumbPosition,
              )}
              data-testid="SwitchThumb"
            />
          </div>
          <label
            id={`${name}-label`}
            htmlFor={name}
            className={cn('Label', 'group relative flex items-center')}
            data-testid="Label"
          >
            {content || label}
          </label>
        </div>
      )
    }

    return (
      <div
        className={cn('CheckboxWrap', 'flex items-start', !fake && checkboxMargin[size], className)}
        data-testid="CheckboxWrap"
      >
        <div
          className={cn(
            'CheckboxInputWrap',
            'relative mr-2 flex',
            inputWrapClass,
            checkboxVariant[variant][color],
            checkboxSize[size],
            disabled && 'disabled',
            disabled && disabledVariant[variant],
            error && 'error ' + inputErrorClass,
          )}
          data-testid="CheckboxInputWrap"
        >
          {!fake && (
            <input
              id={name}
              className={cn(
                'absolute left-0 top-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed',
                checkboxSize[size],
              )}
              type="checkbox"
              name={name}
              value={value}
              onChange={e => onChange(e.target.value)}
              checked={isChecked}
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              aria-labelledby={`${name}-label`}
              ref={ref}
              {...rest}
            />
          )}
          <CheckIcon
            className={cn(
              'CheckIcon',
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              disabled && 'disabled',
              checkVariant[variant][color],
              checkboxSize[size],
              checkVisibility,
            )}
            data-testid="CheckIcon"
          />
        </div>
        {!fake && (
          <label
            id={`${name}-label`}
            htmlFor={name}
            className={cn('Label', checkLabelSize[size])}
            data-testid="Label"
          >
            {content || label}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
