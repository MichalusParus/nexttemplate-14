'use client'
import { isAfter, isBefore, isSameDay } from 'date-fns'
import { forwardRef } from 'react'

import { DatePicker } from '../../DatePickerField/DatePicker'
import { DatePickerProps } from '../../DatePickerField/DatePicker/DatePicker'

export type RangeDatePickerProps = Omit<
  DatePickerProps,
  'value' | 'onChange' | 'onClear' | 'onClose'
> & {
  /** current value of component */
  value: { start?: Date; end?: Date }
  /** onChange function */
  onChange: (value: { start?: Date; end?: Date }) => void
}

/** Basic custom RangeDatePicker. For form purposes use RangeDatePicker. Button, Dropdown and Calendar props supported. USE CLIENT */
export const RangeDatePicker = forwardRef<HTMLButtonElement, RangeDatePickerProps>(
  ({ name, value, error, calendarProps, onChange, ...rest }, ref) => {
    const handleChange = (date: Date) => {
      if (!value?.start || (value.start && value.end)) {
        onChange({ start: date, end: undefined })
        return
      } else if (isSameDay(value.start, date)) {
        onChange({ start: undefined, end: undefined })
        return
      } else if (value?.start && !value.end && isBefore(value.start, date)) {
        onChange({ start: value?.start, end: date })
        return
      } else if (value?.start && !value.end && isAfter(value.start, date)) {
        onChange({ start: date, end: value?.start })
        return
      }
    }

    const handleClose = () => {
      if (!value?.end) {
        onChange({})
      }
    }

    return (
      <DatePicker
        name={name}
        value={value?.start}
        error={error}
        calendarProps={{ ...calendarProps, range: value }}
        onClose={handleClose}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
    )
  },
)

RangeDatePicker.displayName = 'RangeDatePicker'
