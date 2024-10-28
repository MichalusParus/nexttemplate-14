'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { forwardRef, useCallback } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { InferType, object, string } from 'yup'

import { Button } from '@/components/atoms/common/Button'
import { SearchIcon } from '@/components/atoms/icons'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Form } from '../Form'
import { InputField } from '../InputField'
import { Input } from '../InputField/Input'
import { searchColor, searchSize } from './SearchBar.style'

export type SearchBarProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** name of searchbar */
  name: string
  /** optional placeholder for search input */
  placeholder?: string
  /** width of component as tailwind class */
  width?: string
  /** optional url for search redirect */
  url?: string
  /** disable input */
  disabled?: boolean
  /** optional onChange function */
  onChange?: (value: string) => void
  /** optional onSubmit function */
  onSubmit?: (value: string) => void
}

/** Search input inside form with optional onChange, onSubmit or default redirect to search page. USE CLIENT */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      name,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placeholder = '',
      width = 'w-full',
      url = 'search?search=',
      disabled,
      onSubmit,
      onChange,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const { push } = useRouter()
    const schema = object().shape({ [name]: string().optional() })
    const form = useForm<InferType<typeof schema>>({
      resolver: yupResolver(schema),
      defaultValues: {},
    })

    const handleOnSubmit = useCallback(
      (value: FieldValues) => {
        if (onSubmit) {
          onSubmit(value[name])
        } else {
          push(`/${url}${value[name]}`)
        }
      },
      [name, url, onSubmit, push],
    )

    if (onChange) {
      return (
        <div className={cn('SearchBar', className)} role="search">
          <Input
            className={searchSize[size]}
            name={name}
            label="search"
            type="search"
            role="searchbox"
            variant={variant}
            color={color}
            size={size}
            placeholder={placeholder}
            startIcon={<SearchIcon />}
            labelProps={{ hideLabel: true, hideError: true, width: width }}
            ref={ref}
            disabled={disabled}
            onChange={value => onChange(String(value))}
          />
        </div>
      )
    }

    return (
      <Form
        className={cn('SearchBarForm', 'relative flex', className)}
        name={`${name}Form`}
        form={form}
        role="search"
        onSubmit={handleOnSubmit}
      >
        <InputField
          className={searchSize[size]}
          name={name}
          label="search"
          type="search"
          role="searchbox"
          variant={variant}
          color={color}
          size={size}
          placeholder={placeholder}
          startIcon={
            <Button
              className={cn('SearchBarSubmit', 'px-0 py-0', searchColor[variant][color])}
              type="submit"
              variant="text"
              color="none"
              size={size}
              startIcon={<SearchIcon />}
              disabled={disabled}
              aria-label={t('search')}
            />
          }
          labelProps={{ hideLabel: true, hideError: true, width: width }}
          disabled={disabled}
        />
      </Form>
    )
  },
)

SearchBar.displayName = 'SearchBar'
