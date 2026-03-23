'use client'
import { forwardRef, ReactNode } from 'react'

import {
  disabledVariant,
  textSize,
  textVariant,
} from '@/components/utils/common.style'
import { FieldProps, InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import {
  checkboxMargin,
  checkboxVariant,
  checkIconDisabledVariant,
} from '../../CheckboxField/Checkbox/Checkbox.style'
import { switchLeft, switchSize, switchWrapClass, thumbClass } from './Switch.style'

export type SwitchProps = NativeInputProps &
  Pick<FieldProps, 'label'> &
  InputProps &
  StyleProps & {
    /** value of input — identity string used by groups and onChange */
    value: string
    /** optional element to display in label */
    content?: ReactNode
    /** optional checked status for Group use */
    isChecked: boolean
    /** visual-only mode without input */
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
      isChecked,
      error,
      fake,
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const thumbPosition = isChecked ? switchLeft[size] : '-left-1'

    return (
      <div
        className={cn(
          'SwitchWrap',
          'group flex items-start',
          !fake && checkboxMargin[size],
          className,
        )}
        data-testid="SwitchWrap"
      >
        <div
          className={cn(
            'SwitchInputWrap',
            'relative flex',
            switchWrapClass,
            isChecked && !fake && 'selected',
            !fake && 'mr-2',
            switchSize[size],
            checkboxVariant[variant][color],
            error && 'error',
            disabled && 'disabled ' + disabledVariant[variant],
          )}
          aria-disabled={disabled}
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
              role="switch"
              checked={isChecked}
              aria-checked={isChecked}
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
              textVariant[variant][color],
              checkIconDisabledVariant[variant],
              thumbPosition,
            )}
            data-testid="SwitchThumb"
          />
        </div>
        {!fake && (
          <label
            id={`${name}-label`}
            htmlFor={name}
            className={cn('Label', textSize[size])}
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
