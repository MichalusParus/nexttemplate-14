'use client'
import { forwardRef, TextareaHTMLAttributes } from 'react'

import { cn } from '@/utils/utils'

import { Label, LabelProps } from '../../../../atoms/common/Label/Label'
import {
  disabledVariant,
  inputClass,
  inputSize,
  inputVariant,
} from '../../InputField/Input/Input.style'

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'width' | 'value'
> &
  Omit<LabelProps, 'name'> & {
    /** name of form field */
    name: string
    /** value of textarea */
    value?: string
    /** style variant of component */
    variant?: 'text' | 'outlined' | 'contained'
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled TextArea inside Label Component. For form purposes use TextAreaField. Default TextareaHTMLAttributes props supported. USE CLIENT */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className = '',
      name,
      label,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      value,
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
      >
        <textarea
          className={cn(
            inputClass,
            inputVariant[variant][color],
            inputSize[size],
            disabledVariant[variant],
            error && 'shadow-error',
            !hideError && 'mb-1',
          )}
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          ref={ref}
          tabIndex={disabled ? -1 : 0}
          aria-describedby={`${name}-description`}
          onChange={e => onChange(e.target.value)}
          {...rest}
        />
      </Label>
    )
  },
)

TextArea.displayName = 'TextArea'
