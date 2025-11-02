'use client'
import { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from 'react'

import { InputProps, NativeInputProps, StyleProps } from '@/components/utils/types'

import { TextInput } from '../../TextField/TextInput'
import { cleanValue, formatValue, getSeparators, validateValue } from './utils'

export type NumberInputProps = Omit<NativeInputProps, 'min' | 'max'> &
  InputProps &
  StyleProps & {
    /** value of input */
    value?: number
    /** boolean for negative values */
    allowNegative?: boolean
    /** number of decimal places, zero by default */
    allowDecimal?: number
    /** format type for number input */
    formatOptions?: Intl.NumberFormatOptions
    /** optional locale format */
    locale?: Intl.LocalesArgument
    /** minimal value of input */
    min?: number
    /** maximal value of input */
    max?: number
    /** pass svg icon before input value */
    startIcon?: ReactNode
    /** pass svg icon after input value */
    endIcon?: ReactNode
    /** onChange function */
    onChange: (value?: number) => void
  }

/** Styled uncontroled NumberInput with value formatting. For form purposes use NumberField. Alternatively TextInput with type number can be used for nativish number input. Native InputHTMLAttributes and Label props supported. USE CLIENT */
export const NumberInput = forwardRef<HTMLInputElement | null, NumberInputProps>(
  (
    {
      value,
      allowNegative,
      allowDecimal = 2,
      formatOptions,
      locale,
      min,
      max = 999999999999999,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const isFocusedRef = useRef(false)
    const { groupSeparator, decimalSeparator } = useMemo(
      () => getSeparators(locale, formatOptions),
      [locale, formatOptions],
    )
    const [internalValue, setInternalValue] = useState('')

    const handleFocus = () => {
      isFocusedRef.current = true
      if (value || value === 0) {
        const validatedValue = validateValue(
          cleanValue(
            internalValue,
            allowDecimal,
            !!allowNegative,
            groupSeparator,
            decimalSeparator,
          ) || '',
          allowNegative,
          min,
          max,
        )
        const localizedValidatedValue =
          validatedValue?.toString().replace('.', decimalSeparator) || ''
        setInternalValue(localizedValidatedValue)
      } else {
        setInternalValue('')
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = false
      rest.onBlur?.(e)
      if (value || value === 0) {
        setInternalValue(formatValue(value, allowDecimal, formatOptions, locale))
      } else {
        setInternalValue('')
      }
    }

    const handleChange = (inputValue: string) => {
      if (!inputValue) {
        setInternalValue('')
        onChange(undefined)
        return
      }
      const cleanedValue = cleanValue(
        inputValue,
        allowDecimal,
        !!allowNegative,
        groupSeparator,
        decimalSeparator,
      )
      if (cleanedValue === null) return
      setInternalValue(inputValue)
      const parsedValue = validateValue(cleanedValue, allowNegative, min, max)
      if (parsedValue === null) return
      onChange(parsedValue)
    }

    useEffect(() => {
      if (!isFocusedRef.current) {
        if (value || value === 0) {
          setInternalValue(formatValue(value, allowDecimal, formatOptions, locale))
        } else {
          setInternalValue('')
        }
      }
    }, [value, allowDecimal, allowNegative, formatOptions, min, max, locale])

    return (
      <TextInput
        value={internalValue}
        onChange={handleChange}
        inputMode="decimal"
        data-testid="NumberInput"
        ref={ref}
        {...rest}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'
