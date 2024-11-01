'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, InputHTMLAttributes, ReactNode, useImperativeHandle, useRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { buttonIconSize } from '@/components/atoms/common/Button/Button.style'
import { XIcon } from '@/components/atoms/icons'
import { FieldProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'
import { checkVariant } from '../../CheckboxField/Checkbox/Checkbox.style'
import {
  disabledVariant,
  inputClass,
  inputIconPosition,
  inputSize,
  inputVariant,
} from './Input.style'

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'value' | 'type' | 'placeholder' | 'width'
>

export type InputProps = NativeInputProps &
  FieldProps &
  StyleProps & {
    /** input type, text, number, password, search, date supported */
    type?: string
    /** value of input */
    value?: string
    /** pass svg icon before input value */
    startIcon?: ReactNode
    /** onChange function */
    onChange: (value: string | number) => void
  }

/** Basic styled uncontroled Input inside Label Component. For form purposes use InputField. Default InputHTMLAttributes props supported. USE CLIENT */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      name,
      label,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      value,
      error,
      disabled,
      startIcon,
      labelProps,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const inputRef = useRef<HTMLInputElement | null>(null)
    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <div className={cn('InputWrap', 'relative w-full', !labelProps?.hideError && 'mb-1')}>
          <input
            id={name}
            className={cn(
              inputClass,
              inputVariant[variant][color],
              inputSize[size],
              disabledVariant[variant],
              error && 'border-error-800 shadow-error',
              startIcon && 'pl-9',
              type === 'search' && 'pr-7',
              className,
            )}
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            ref={inputRef}
            tabIndex={disabled ? -1 : 0}
            aria-describedby={`${name}-description`}
            onChange={e => onChange(e.target.value)}
            {...rest}
          />
          {startIcon && (
            <span
              className={cn(
                'left-2 inline-flex',
                inputIconPosition,
                checkVariant[variant][color],
                buttonIconSize[size],
              )}
            >
              {startIcon}
            </span>
          )}
          {type === 'search' && (value || inputRef?.current?.value) && (
            <Button
              className={cn(
                'ClearButton',
                'right-1 border-none',
                inputIconPosition,
                buttonIconSize[size],
              )}
              variant={variant}
              color={color}
              size="none"
              startIcon={<XIcon />}
              hideShadow
              aria-label={t('clear')}
              onClick={() => {
                onChange('')
                inputRef.current!.value = ''
              }}
            />
          )}
        </div>
      </Label>
    )
  },
)

Input.displayName = 'Input'
