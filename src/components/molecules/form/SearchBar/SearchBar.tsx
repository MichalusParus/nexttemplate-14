'use client'
import { useRouter } from 'next/navigation'
import { forwardRef, useCallback } from 'react'
import { FieldValues } from 'react-hook-form'
import { object } from 'yup'

import Button from '@/components/atoms/common/Button'
import SearchIcon from '@/components/atoms/icons/SearchIcon'

import Form from '../Form'
import InputField from '../InputField'
import Input from '../InputField/Input'
import { searchColor, searchSize } from './SearchBar.style'
import { cn } from '@/utils/utils'
import { useTranslations } from 'next-intl'

export type SearchBarProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name of searchbar */
  name: string
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
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
      className = '',
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
            width={width}
            placeholder={placeholder}
            startIcon={<SearchIcon />}
            hideLabel
            hideError
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
        initialValues={{ [name]: '' }}
        validationSchema={object().shape({})}
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
          width={width}
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
          hideLabel
          hideError
          disabled={disabled}
        />
      </Form>
    )
  },
)

SearchBar.displayName = 'SearchBar'
