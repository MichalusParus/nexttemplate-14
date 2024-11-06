'use client'
import { forwardRef, TextareaHTMLAttributes } from 'react'

import { FieldProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'
import {
  disabledVariant,
  inputClass,
  inputSize,
  inputVariant,
} from '../../TextField/TextInput/TextInput.style'

type NativeTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'value' | 'placeholder' | 'width'
>

export type TextAreaProps = NativeTextAreaProps &
  FieldProps &
  StyleProps & {
    /** value of textarea */
    value?: string
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled TextArea inside Label Component. For form purposes use TextAreaField. Default TextareaHTMLAttributes props supported. USE CLIENT */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      name,
      label,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      error,
      disabled,
      labelProps,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <textarea
          id={name}
          className={cn(
            inputClass,
            inputVariant[variant][color],
            inputSize[size],
            disabledVariant[variant],
            error && 'border-error-800 shadow-error',
            !labelProps?.hideError && 'mb-1',
            className,
          )}
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
