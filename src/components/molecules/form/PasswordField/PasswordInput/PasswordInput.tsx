'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, InputHTMLAttributes, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { buttonIconSize } from '@/components/atoms/common/Button/Button.style'
import { CloseEyeIcon, OpenEyeIcon } from '@/components/atoms/icons'
import { InputProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { TextInput } from '../../TextField/TextInput'

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'value' | 'type' | 'placeholder' | 'width'
>

export type PasswordInputProps = NativeInputProps &
  InputProps &
  StyleProps & {
    /** value of input */
    value?: string
    /** onChange function */
    onChange: (value: string | number) => void
  }

/** Basic styled uncontroled PasswordInput. For form purposes use PasswordField. Default InputHTMLAttributes props supported. USE CLIENT */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
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
    const t = useTranslations('Components')
    const [isVisible, setIsVisible] = useState(false)

    return (
      <TextInput
        type={isVisible ? 'text' : 'password'}
        name={name}
        value={value}
        variant={variant}
        color={color}
        size={size}
        endIcon={
          <Button
            className={cn('VisibilityButton', 'border-none', buttonIconSize[size])}
            type="button"
            variant={variant}
            color={color}
            size="none"
            hideShadow
            startIcon={isVisible ? <OpenEyeIcon /> : <CloseEyeIcon />}
            disabled={disabled}
            aria-label={isVisible ? t('hidePassword') : t('showPassword')}
            onClick={() => setIsVisible(prev => !prev)}
          />
        }
        error={error}
        disabled={disabled}
        onChange={onChange}
        ref={ref}
        data-testid="PasswordInput"
        {...rest}
      />
    )
  },
)

PasswordInput.displayName = 'PasswordInput'
