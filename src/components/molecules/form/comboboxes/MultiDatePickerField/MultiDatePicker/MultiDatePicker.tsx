'use client'
import { compareAsc, isSameDay } from 'date-fns'
import { forwardRef } from 'react'

import { normalizeDateValue } from '@/utils/utils'

import { DatePicker, DateValue } from '../../DatePickerField/DatePicker'
import { DatePickerProps } from '../../DatePickerField/DatePicker/DatePicker'

export type MultiDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange' | 'onClear'> & {
  /** current value of component */
  value: DateValue[]
  /** onChange function */
  onChange: (value: Date[]) => void
}

/** Basic custom uncontroled MultiDatePicker. For form purposes use MultiDatePicker. Button, Dropdown and Calendar props supported. USE CLIENT */
export const MultiDatePicker = forwardRef<HTMLButtonElement | null, MultiDatePickerProps>(
  ({ name, value = [], error, calendarProps, onChange, ...rest }, ref) => {
    const dateValues = value.map(v => normalizeDateValue(v)).filter(v => v !== undefined)

    const handleChange = (date: Date) => {
      if (dateValues.some(v => isSameDay(v, date))) {
        onChange(dateValues.filter(v => !isSameDay(v, date)))
      } else {
        const sortedDates = [...dateValues, date].sort(compareAsc)
        onChange(sortedDates)
      }
    }

    return (
      <DatePicker
        name={name}
        value={value?.[0]}
        error={error}
        calendarProps={{ ...calendarProps, multiValue: dateValues }}
        onClear={() => onChange([])}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
    )
  },
)

MultiDatePicker.displayName = 'MultiDatePicker'
