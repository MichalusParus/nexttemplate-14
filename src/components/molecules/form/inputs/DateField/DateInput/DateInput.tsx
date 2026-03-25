'use client'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import { TextInput, TextInputProps } from '../../TextField/TextInput'
import { applyMask, clampDate, formatDateForInput, getDateFormat, parseDigits, stripToDigits } from './utils'

export type DateInputProps = Omit<TextInputProps, 'type' | 'value' | 'onChange' | 'min' | 'max'> & {
  /** value of input */
  value?: Date
  /** optional locale format */
  locale?: Intl.LocalesArgument
  /** minimal date of input */
  min?: Date
  /** maximal date of input */
  max?: Date
  /** onChange function */
  onChange: (value?: Date) => void
}

/** Styled uncontroled DateInput with masked date formatting. For form purposes use DateField. Wraps TextInput with type="text" and inputMode="numeric". Native InputHTMLAttributes props supported. USE CLIENT */
export const DateInput = forwardRef<HTMLInputElement | null, DateInputProps>(
  (
    {
      value,
      placeholder: placeholderProp,
      locale,
      min,
      max,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const isFocusedRef = useRef(false)
    const { order, separator, placeholder } = useMemo(() => getDateFormat(locale), [locale])
    const [internalValue, setInternalValue] = useState('')

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = true
      rest.onFocus?.(e)
      if (value) {
        setInternalValue(formatDateForInput(value, locale))
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = false
      rest.onBlur?.(e)
      if (value) {
        const clamped = clampDate(value, min, max)
        if (clamped !== value) onChange(clamped)
        setInternalValue(formatDateForInput(clamped, locale))
      } else {
        const digits = stripToDigits(internalValue)
        if (digits.length === 8) {
          const parsed = parseDigits(digits, order)
          if (parsed) {
            const clamped = clampDate(parsed, min, max)
            onChange(clamped)
            setInternalValue(formatDateForInput(clamped, locale))
            return
          }
        }
        setInternalValue('')
      }
    }

    const handleChange = (inputValue: string) => {
      if (!inputValue) {
        setInternalValue('')
        onChange(undefined)
        return
      }
      const digits = stripToDigits(inputValue)
      const masked = applyMask(digits, separator)
      setInternalValue(masked)

      if (digits.length === 8) {
        const parsed = parseDigits(digits, order)
        if (parsed) onChange(parsed)
      }
    }

    useEffect(() => {
      if (!isFocusedRef.current) {
        if (value) {
          setInternalValue(formatDateForInput(value, locale))
        } else {
          setInternalValue('')
        }
      } else if (!value) {
        setInternalValue('')
      }
    }, [value, locale])

    return (
      <TextInput
        value={internalValue}
        onChange={handleChange}
        inputMode="numeric"
        autoComplete="off"
        placeholder={placeholderProp || placeholder}
        data-testid="DateInput"
        ref={ref}
        {...rest}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    )
  },
)

DateInput.displayName = 'DateInput'
