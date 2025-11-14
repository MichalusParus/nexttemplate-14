'use client'
import { isAfter, isBefore, isSameDay } from 'date-fns'
import { forwardRef } from 'react'

import { normalizeDateValue } from '@/utils/utils'

import { DatePicker, DateValue } from '../../DatePickerField/DatePicker'
import { DatePickerProps } from '../../DatePickerField/DatePicker/DatePicker'

export type RangeValue = { start?: DateValue; end?: DateValue }

export type RangeDatePickerProps = Omit<
  DatePickerProps,
  'value' | 'onChange' | 'displayChips' | 'chipProps' | 'onClear'
> & {
  /** current value of component */
  value: RangeValue
  /** onChange function */
  onChange: (value: { start?: Date; end?: Date }) => void
}

/** Basic custom RangeDatePicker. For form purposes use RangeDatePicker. Button, Dropdown and Calendar props supported. USE CLIENT */
export const RangeDatePicker = forwardRef<HTMLButtonElement | null, RangeDatePickerProps>(
  ({ name, value, error, calendarProps, onClose, onChange, ...rest }, ref) => {
    const rangeValue = {
      start: normalizeDateValue(value?.start),
      end: normalizeDateValue(value?.end),
    }

    const handleChange = (date: Date) => {
      if (!rangeValue?.start || (rangeValue.start && rangeValue.end)) {
        onChange({ start: date, end: undefined })
        return
      } else if (isSameDay(rangeValue.start, date)) {
        onChange({ start: undefined, end: undefined })
        return
      } else if (rangeValue?.start && !rangeValue.end && isBefore(rangeValue.start, date)) {
        onChange({ start: rangeValue?.start, end: date })
        return
      } else if (rangeValue?.start && !rangeValue.end && isAfter(rangeValue.start, date)) {
        onChange({ start: date, end: rangeValue?.start })
        return
      }
    }

    const handleClose = () => {
      onClose?.()
      if (!rangeValue?.end) {
        onChange({})
      }
    }

    return (
      <DatePicker
        name={name}
        value={rangeValue?.start}
        error={error}
        calendarProps={{ ...calendarProps, range: rangeValue }}
        onClear={() => onChange({})}
        onClose={handleClose}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
    )
  },
)

RangeDatePicker.displayName = 'RangeDatePicker'
