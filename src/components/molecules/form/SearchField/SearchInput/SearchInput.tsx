'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { buttonIconSize } from '@/components/atoms/common/Button/Button.style'
import { SearchIcon, XIcon } from '@/components/atoms/icons'
import { InputProps, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { TextInput } from '../../TextField/TextInput'

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'name' | 'className' | 'value' | 'type' | 'placeholder' | 'width'
>

export type SearchInputProps = NativeInputProps &
  InputProps &
  StyleProps & {
    /** value of input */
    value?: string
    /** onChange function */
    onChange: (value: string | number) => void
  }

/** Basic styled uncontroled SearchInput. For form purposes use SearchField. Default InputHTMLAttributes props supported. USE CLIENT */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
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
    const inputRef = useRef<HTMLInputElement | null>(null)
    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <TextInput
        type="search"
        name={name}
        value={value}
        variant={variant}
        color={color}
        size={size}
        startIcon={<SearchIcon />}
        endIcon={
          (value || inputRef?.current?.value) && (
            <Button
              className={cn('ClearButton', 'border-none', buttonIconSize[size])}
              type="button"
              variant={variant}
              color={color}
              size="none"
              startIcon={<XIcon />}
              hideShadow
              disabled={disabled}
              aria-label={t('clear')}
              onClick={() => {
                onChange('')
                inputRef.current!.value = ''
              }}
            />
          )
        }
        error={error}
        disabled={disabled}
        onChange={onChange}
        ref={inputRef}
        {...rest}
      />
    )
  },
)

SearchInput.displayName = 'SearchInput'
