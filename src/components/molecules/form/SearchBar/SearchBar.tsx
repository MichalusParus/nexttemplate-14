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
        <div className={`${className} relative flex`} role="search">
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
            hideLabel
            hideError
            ref={ref}
            disabled={disabled}
            onChange={value => onChange(String(value))}
          />
          <div className="FakeSubmitWrap absolute left-0">
            <Button
              className={searchColor[variant][color]}
              variant="text"
              color="none"
              size={size}
              startIcon={<SearchIcon />}
              aria-label="search"
              tabIndex={-1}
            />
          </div>
        </div>
      )
    }

    return (
      <Form
        className={`${className} relative flex`}
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
          hideLabel
          hideError
          disabled={disabled}
        />
        <div className="SubmitWrap absolute left-0">
          <Button
            className={searchColor[variant][color]}
            type="submit"
            variant="text"
            color="none"
            size={size}
            startIcon={<SearchIcon />}
            aria-label="search"
          />
        </div>
      </Form>
    )
  },
)

SearchBar.displayName = 'SearchBar'
