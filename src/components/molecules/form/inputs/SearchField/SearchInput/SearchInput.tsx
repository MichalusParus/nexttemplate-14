'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { buttonIconSize } from '@/components/atoms/common/Button/Button.style'
import { SearchIcon, XIcon } from '@/components/atoms/icons'
import { InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { TextInput } from '../../TextField/TextInput'

export type SearchInputProps = NativeInputProps &
  InputProps &
  StyleProps & {
    /** value of input */
    value?: string
    /** onChange function */
    onChange: (value: string) => void
    /** Optional callback when clear button is clicked */
    onClear?: () => void
  }

/** Basic styled uncontroled SearchInput. For form purposes use SearchField. Native InputHTMLAttributes props supported. USE CLIENT */
export const SearchInput = forwardRef<HTMLInputElement | null, SearchInputProps>(
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
      onClear,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const inputRef = useRef<HTMLInputElement | null>(null)
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current,
    )

    return (
      <TextInput
        type="search"
        name={name}
        value={value}
        variant={variant}
        color={color}
        size={size}
        startIcon={<SearchIcon aria-hidden data-testid="SearchIcon" />}
        endIcon={
          <Button
            className={cn(
              'ClearButton',
              'invisible border-none',
              buttonIconSize[size],
              (value || inputRef?.current?.value) && 'visible',
            )}
            type="button"
            variant={variant}
            color={color}
            size="none"
            startIcon={<XIcon />}
            hideShadow
            disabled={disabled}
            aria-label={t('clear')}
            onClick={() => {
              if (onClear) {
                onClear()
              } else {
                onChange('')
              }
              inputRef.current!.value = ''
            }}
          />
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
