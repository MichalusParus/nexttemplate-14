'use client'
import {
  eachMonthOfInterval,
  endOfYear,
  getMonth,
  isAfter,
  isBefore,
  isSameMonth,
  setMonth,
  startOfDay,
  startOfMonth,
  startOfYear,
} from 'date-fns'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

export type MonthPickerProps = StyleProps & {
  /** current month */
  month: Date
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** optional combobox props for select combobox */
  buttonProps?: Partial<ButtonProps>
  /** set calendar state function */
  setCalendarState: (state: 'days' | 'months' | 'years') => void
  /** set current month function */
  setCurrentMonth: (date: Date) => void
}

/** Month picker subcomponent for calendar. USE CLIENT */
export const MonthPicker = ({
  month,
  minMaxDate,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  buttonProps = {},
  setCalendarState,
  setCurrentMonth,
}: MonthPickerProps) => {
  const t = useTranslations('Components')
  const { className: buttonClassName, ...restButtonProps } = buttonProps
  const monthRows = useMemo(() => {
    const months = eachMonthOfInterval({ start: startOfYear(month), end: endOfYear(month) })
    return Array.from({ length: 4 }, (_, i) => months.slice(i * 3, i * 3 + 3))
  }, [month])

  const handleMonthChange = useCallback(
    (m: Date) => {
      const newDate = startOfDay(setMonth(month, getMonth(m)))
      if (minMaxDate?.min && isBefore(newDate, startOfDay(minMaxDate?.min))) {
        setCurrentMonth(minMaxDate?.min)
      } else if (minMaxDate?.max && isAfter(newDate, startOfDay(minMaxDate?.max))) {
        setCurrentMonth(minMaxDate?.max)
      } else {
        setCurrentMonth(newDate)
      }
      setCalendarState('days')
    },
    [month, minMaxDate, setCalendarState, setCurrentMonth],
  )

  return (
    <div
      className={cn('MonthPicker', 'grid grid-cols-3 gap-x-1 gap-y-6 py-6')}
      role="grid"
      data-testid="MonthPicker"
    >
      {monthRows.map(row => (
        <div key={String([row[0], row[6]])} className="contents" role="row">
          {row.map(m => (
            <Button
              key={m.toDateString()}
              className={cn(
                'DateButton',
                'w-full border-none font-normal',
                isSameMonth(m, month) && 'selected shadow-ring',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              startIcon={t(`months.${getMonth(m)}`)}
              aria-label={t(`months.${getMonth(m)}`)}
              hideShadow
              disabled={
                (minMaxDate?.min && isBefore(startOfMonth(m), startOfMonth(minMaxDate?.min))) ||
                (minMaxDate?.max && isAfter(startOfMonth(m), startOfMonth(minMaxDate?.max)))
              }
              tabIndex={-1}
              role="gridcell"
              aria-selected={isSameMonth(m, month)}
              aria-current={isSameMonth(m, new Date()) ? 'date' : undefined}
              onClick={() => handleMonthChange(m)}
              {...restButtonProps}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

MonthPicker.displayName = 'MonthPicker'
