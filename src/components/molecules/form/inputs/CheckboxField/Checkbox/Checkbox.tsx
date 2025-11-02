'use client'
import { forwardRef, ReactNode } from 'react'

import { CheckIcon } from '@/components/atoms/icons'
import { FieldProps, InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
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
} from './Checkbox.style'

export type CheckboxProps = NativeInputProps &
  Pick<FieldProps, 'label'> &
  InputProps &
  StyleProps & {
    /** value of input */
    value?: string
    /** optional element to display in label */
    content?: ReactNode
    /** optional checked status for Group use */
    isChecked: boolean
    /** error state */
    fake?: boolean
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled Checkbox. For form purposes use CheckboxField. Native InputHTMLAttributes props supported. USE CLIENT */
export const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
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

    return (
      <div
        className={cn(
          'CheckboxWrap',
          'group flex items-start',
          !fake && checkboxMargin[size],
          className,
        )}
        data-testid="CheckboxWrap"
      >
        <div
          className={cn(
            'CheckboxInputWrap',
            'relative mr-2 flex',
            inputWrapClass,
            isChecked && 'checked',
            checkboxVariant[variant][color],
            checkboxSize[size],
            error && !disabled && 'error ' + inputErrorClass,
            disabled && 'disabled ' + disabledVariant[variant],
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
