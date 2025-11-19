'use client'
import { forwardRef, ReactNode } from 'react'

import { childrenIconSize, disabledClassVariant } from '@/components/utils/common.style'
import { InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import {
  inputClass,
  inputSize,
  inputVariant,
  inputWrapClass,
} from './TextInput.style'

export type TextInputProps = NativeInputProps &
  InputProps &
  StyleProps & {
    /** value of input */
    value?: string
    /** optional type of input */
    type?: 'text' | 'password' | 'search' | 'number'
    /** pass svg icon before input value */
    startIcon?: ReactNode
    /** pass svg icon after input value */
    endIcon?: ReactNode
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled uncontroled TextInput. For form purposes use TextField. Native InputHTMLAttributes props supported. USE CLIENT */
export const TextInput = forwardRef<HTMLInputElement | null, TextInputProps>(
  (
    {
      className,
      name,
      value,
      type = 'text',
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
          error && 'error',
          disabled && 'disabled ' + disabledClassVariant[variant],
          childrenIconSize[size],
          className,
        )}
        aria-disabled={disabled}
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
          value={value}
          disabled={disabled}
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
