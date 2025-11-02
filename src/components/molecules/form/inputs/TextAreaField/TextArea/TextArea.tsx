'use client'
import { forwardRef, TextareaHTMLAttributes } from 'react'

import { InputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import {
  disabledVariant,
  inputClass,
  inputErrorClass,
  inputSize,
  inputVariant,
  inputWrapClass,
} from '../../../inputs/TextField/TextInput/TextInput.style'

type NativeTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'value' | 'placeholder' | 'width'
>

export type TextAreaProps = NativeTextAreaProps &
  InputProps &
  StyleProps & {
    /** value of textarea */
    value?: string
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled TextArea. For form purposes use TextAreaField. Native TextareaHTMLAttributes props supported. USE CLIENT */
export const TextArea = forwardRef<HTMLTextAreaElement | null, TextAreaProps>(
  (
    {
      className,
      name,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      error,
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'TextAreaWrap',
          inputWrapClass,
          inputVariant[variant][color],
          error && 'error ' + inputErrorClass,
          disabled && 'disabled ' + disabledVariant[variant],
          className,
        )}
        data-testid="TextAreaWrap"
      >
        <textarea
          id={name}
          className={cn(inputClass, inputSize[size])}
          name={name}
          value={value}
          disabled={disabled}
          onChange={e => onChange(e.target.value)}
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'
