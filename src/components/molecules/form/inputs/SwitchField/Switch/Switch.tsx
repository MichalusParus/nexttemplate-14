'use client'
import { forwardRef, ReactNode } from 'react'

import { FieldProps, InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { checkLabelSize } from '../../CheckboxField/Checkbox/Checkbox.style'
import { inputErrorClass } from '../../TextField/TextInput/TextInput.style'
import {
  disabledVariant,
  switchClass,
  switchLeft,
  switchMargin,
  switchSize,
  switchVariant,
  thumbClass,
  thumbVariant,
} from './Switch.style'

export type SwitchProps = NativeInputProps &
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

/** Basic styled Switch. For form purposes use SwitchField. Native InputHTMLAttributes props supported. USE CLIENT */
export const Switch = forwardRef<HTMLInputElement | null, SwitchProps>(
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
      isChecked = false,
      error,
      fake,
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const thumbPosition = isChecked || disabled ? switchLeft[size] : '-left-1'

    return (
      <div
        className={cn(
          'SwitchWrap',
          'group flex items-start',
          !fake && switchMargin[size],
          className,
        )}
        data-testid="SwitchWrap"
      >
        <div
          className={cn(
            'SwitchInputWrap',
            'relative mr-2 flex',
            switchClass,
            isChecked && 'checked',
            switchSize[size],
            switchVariant[variant][color],
            error && !disabled && 'error ' + inputErrorClass,
            disabled && 'disabled ' + disabledVariant[variant],
          )}
          data-testid="SwitchInputWrap"
        >
          {!fake && (
            <input
              id={name}
              className={cn(
                'absolute left-0 top-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed',
                switchSize[size],
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
          <div
            className={cn(
              'SwitchThumb',
              disabled && 'disabled',
              thumbClass,
              thumbVariant[variant][color],
              thumbPosition,
            )}
            data-testid="SwitchThumb"
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

Switch.displayName = 'Switch'
