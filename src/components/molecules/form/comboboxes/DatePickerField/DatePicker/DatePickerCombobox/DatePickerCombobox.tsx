'use client'
import { forwardRef, useCallback, useMemo } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ChipProps } from '@/components/atoms/common/Chip'
import { CalendarIcon } from '@/components/atoms/icons'
import { Ellipsis } from '@/components/atoms/typography/Ellipsis'
import { CalendarProps } from '@/components/molecules/common/Calendar/Calendar'
import { ClearButton } from '@/components/molecules/form/comboboxes/SelectField/Select/ClearButton'
import { ValueChips } from '@/components/molecules/form/comboboxes/SelectField/Select/ValueChips'
import {
  inputSize,
  inputVariant,
} from '@/components/molecules/form/inputs/TextField/TextInput/TextInput.style'
import { childrenIconSize } from '@/components/utils/common.style'
import { InputProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

type PartialButtonProps = Omit<
  Partial<ButtonProps>,
  | 'value'
  | 'onChange'
  | 'name'
  | 'isLoading'
  | 'onClick'
  | 'endIcon'
  | 'startIcon'
  | 'hideShadow'
  | 'onClear'
>

const defaultDateFormatOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
}

export type DatePickerComboboxProps = PartialButtonProps &
  InputProps &
  StyleProps & {
    /** open state of component */
    isOpen: boolean
    /** current value of component */
    value?: Date
    /** optional for enabling displayChips type of multiselect, or for displaying option content in combobox in single Select */
    displayChips?: boolean
    /** for passing aditional props to calendar */
    calendarProps?: Partial<CalendarProps>
    /** for passing aditional props to chips */
    chipProps?: Partial<ChipProps>
    /** optional onClear function that render clear button when value is defined */
    onClear?: () => void
    /** optional locale for date formatting */
    locale?: Intl.LocalesArgument
    /** optional Intl.DateTimeFormat options for date display */
    dateFormatOptions?: Intl.DateTimeFormatOptions
    /** handle onOpen function */
    handleOpen: () => void
    /** handle onChange function */
    handleOnChange: (value: Date) => void
  }

/** Combobox for DatePicker. USE CLIENT */
export const DatePickerCombobox = forwardRef<HTMLButtonElement | null, DatePickerComboboxProps>(
  (
    {
      className,
      isOpen,
      name,
      placeholder,
      value,
      displayChips,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      error,
      calendarProps = {},
      chipProps = {},
      onClear,
      locale,
      dateFormatOptions,
      handleOpen,
      handleOnChange,
      ...rest
    },
    ref,
  ) => {
    const { range, multiValue } = calendarProps

    const formatDate = useCallback(
      (date: Date) =>
        new Intl.DateTimeFormat(locale, dateFormatOptions ?? defaultDateFormatOptions).format(date),
      [locale, dateFormatOptions],
    )

    const comboboxTitle = useMemo(() => {
      if (value && !range && !multiValue) {
        return formatDate(value)
      } else if (range?.start) {
        return `${formatDate(range.start)} ${range?.end ? `- ${formatDate(range.end)}` : '-'}`
      } else if (multiValue?.length) {
        return multiValue.map(v => formatDate(v)).join(', ')
      }
      return placeholder
    }, [multiValue, range, placeholder, value, formatDate])

    return (
      <Button
        id={name}
        className={cn(
          'DatePickerCombobox',
          inputVariant[variant][color],
          inputSize[size],
          childrenIconSize[size],
          'w-full min-w-0 justify-between font-normal',
          isOpen && 'z-combobox',
          className,
        )}
        data-selected={isOpen || undefined}
        data-error={error || undefined}
        name={name}
        type="button"
        variant={variant}
        color="none"
        size="none"
        hideShadow
        disabled={disabled}
        endIcon={
          <div className="flex shrink-0 gap-2">
            {!!value && onClear && <ClearButton onClick={onClear} />}
            <CalendarIcon aria-hidden data-testid="CalendarIcon" />
          </div>
        }
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`${name}-calendar`}
        aria-owns={`${name}-calendar`}
        onClick={handleOpen}
        ref={ref}
        {...rest}
      >
        {!displayChips || !calendarProps.multiValue?.length ? (
          <Ellipsis className={!value ? 'text-placeholder' : ''}>{comboboxTitle}</Ellipsis>
        ) : (
          <ValueChips
            selectedOptions={calendarProps.multiValue.map(v => ({
              value: v.toISOString(),
              label: formatDate(v),
            }))}
            multiValue={calendarProps.multiValue.map(v => v.toISOString())}
            chipProps={chipProps}
            handleOnChange={value => handleOnChange(new Date(value))}
          />
        )}
      </Button>
    )
  },
)

DatePickerCombobox.displayName = 'DatePickerCombobox'
