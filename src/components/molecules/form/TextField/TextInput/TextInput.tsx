'use client'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { buttonIconSize as inputIconSize } from '@/components/atoms/common/Button/Button.style'
import { InputProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import {
  disabledVariant,
  inputClass,
  inputErrorClass,
  inputSize,
  inputVariant,
  inputWrapClass,
} from './TextInput.style'

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'value' | 'type' | 'placeholder' | 'width'
>

export type TextInputProps = NativeInputProps &
  InputProps &
  StyleProps & {
    /** input type text, number supported */
    type?: string
    /** value of input */
    value?: string
    /** pass svg icon before input value */
    startIcon?: ReactNode
    /** pass svg icon after input value */
    endIcon?: ReactNode
    /** onChange function */
    onChange: (value: string | number) => void
  }

/** Basic styled uncontroled TextInput. For form purposes use TextField. Default InputHTMLAttributes props supported. USE CLIENT */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      type = 'text',
      name,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      startIcon,
      endIcon,
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
          'InputWrap',
          inputWrapClass,
          inputVariant[variant][color],
          error && 'error ' + inputErrorClass,
          disabled && 'disabled ' + disabledVariant[variant],
          inputIconSize[size],
          className,
        )}
        data-testid="InputWrap"
      >
        {startIcon && (
          <span className={cn('absolute left-2 top-1/2 -translate-y-1/2')}>{startIcon}</span>
        )}
        <input
          id={name}
          className={cn(inputClass, inputSize[size], startIcon && 'pl-10', endIcon && 'pr-10')}
          name={name}
          type={type}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          aria-describedby={`${name}-description`}
          onChange={e => onChange(e.target.value)}
          ref={ref}
          {...rest}
        />
        {endIcon && (
          <span className={cn('absolute right-2 top-1/2 -translate-y-1/2')}>{endIcon}</span>
        )}
      </div>
    )
  },
)

TextInput.displayName = 'TextInput'
