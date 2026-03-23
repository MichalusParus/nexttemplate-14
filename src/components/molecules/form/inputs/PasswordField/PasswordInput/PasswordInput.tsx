'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { CloseEyeIcon, OpenEyeIcon } from '@/components/atoms/icons'
import { childrenIconSize } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

import { TextInput, TextInputProps } from '../../TextField/TextInput'

export type PasswordInputProps = Omit<TextInputProps, 'type' | 'endIcon'>

/** Basic styled uncontroled PasswordInput. For form purposes use PasswordField. Native InputHTMLAttributes props supported. USE CLIENT */
export const PasswordInput = forwardRef<HTMLInputElement | null, PasswordInputProps>(
  (
    {
      name,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      startIcon,
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
        startIcon={startIcon}
        endIcon={
          <Button
            className={cn('VisibilityButton', 'border-none', childrenIconSize[size])}
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
