'use client'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import { TextInput, TextInputProps } from '../../TextField/TextInput'
import { cleanValue, formatValue, getSeparators, validateValue } from './utils'

export type NumberInputProps = Omit<TextInputProps, 'type' | 'value' | 'onChange' | 'min' | 'max'> & {
  /** value of input */
  value?: number
  /** boolean for negative values */
  allowNegative?: boolean
  /** number of decimal places, default 2 */
  decimalPlaces?: number
  /** format type for number input */
  formatOptions?: Intl.NumberFormatOptions
  /** optional locale format */
  locale?: Intl.LocalesArgument
  /** minimal value of input */
  min?: number
  /** maximal value of input */
  max?: number
  /** onChange function */
  onChange: (value?: number) => void
}

/** Styled uncontroled NumberInput with value formatting. For form purposes use NumberField. Alternatively TextInput with type number can be used for nativish number input. Native InputHTMLAttributes and Label props supported. USE CLIENT */
export const NumberInput = forwardRef<HTMLInputElement | null, NumberInputProps>(
  (
    {
      value,
      allowNegative,
      decimalPlaces = 2,
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
            decimalPlaces,
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
      if (value !== undefined) {
        const clampedValue = validateValue(String(value), allowNegative, min, max)
        if (clampedValue !== null && clampedValue !== value) {
          onChange(clampedValue)
        }
        setInternalValue(formatValue(clampedValue ?? value, decimalPlaces, formatOptions, locale))
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
        decimalPlaces,
        !!allowNegative,
        groupSeparator,
        decimalSeparator,
      )
      if (cleanedValue === null) return
      setInternalValue(inputValue)
      const numberValue = Number(cleanedValue)
      if (isNaN(numberValue)) return
      const finalValue = !allowNegative && numberValue < 0 ? Math.abs(numberValue) : numberValue
      onChange(finalValue)
    }

    useEffect(() => {
      if (!isFocusedRef.current) {
        if (value || value === 0) {
          setInternalValue(formatValue(value, decimalPlaces, formatOptions, locale))
        } else {
          setInternalValue('')
        }
      }
    }, [value, decimalPlaces, allowNegative, formatOptions, min, max, locale])

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
