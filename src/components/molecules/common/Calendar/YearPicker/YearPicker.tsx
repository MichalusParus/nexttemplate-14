'use client'
import {
  addYears,
  eachYearOfInterval,
  endOfYear,
  format,
  getYear,
  isAfter,
  isBefore,
  isSameYear,
  setYear,
  startOfMonth,
  startOfYear,
} from 'date-fns'
import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { disabledClassVariant } from '@/components/utils/common.style'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { scrollHeight } from '../Calendar.styles'

export type YearPickerProps = StyleProps & {
  /** current year */
  year: Date
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** optional combobox props for select combobox */
  buttonProps?: Partial<ButtonProps>
  /** ref for the grid container (used by useCalendarFocus) */
  gridRef?: MutableRefObject<HTMLDivElement | null>
  /** set calendar state function */
  setCalendarState: (state: 'days' | 'months' | 'years') => void
  /** set current month function */
  setCurrentMonth: (date: Date) => void
}

/** Year picker subcomponent for calendar. USE CLIENT */
export const YearPicker = ({
  year,
  minMaxDate,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  buttonProps = {},
  gridRef,
  setCalendarState,
  setCurrentMonth,
}: YearPickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { className: buttonClassName, ...restButtonProps } = buttonProps
  const yearRows = useMemo(() => {
    const date = new Date()
    const years = eachYearOfInterval({
      start: startOfYear(minMaxDate?.min || addYears(date, -30)),
      end: endOfYear(minMaxDate?.max || addYears(date, 30)),
    })
    const rows = years.reduce((groups: Date[][], year: Date, index: number) => {
      if (index % 5 === 0) {
        groups.push([year])
      } else {
        groups[groups.length - 1].push(year)
      }
      return groups
    }, [])
    return rows
  }, [minMaxDate])

  const handleYearChange = useCallback(
    (y: Date) => {
      const newDate = setYear(year, getYear(y))
      if (minMaxDate?.min && isBefore(startOfMonth(newDate), startOfMonth(minMaxDate?.min))) {
        setCurrentMonth(minMaxDate?.min)
      } else if (minMaxDate?.max && isAfter(startOfMonth(newDate), startOfMonth(minMaxDate?.max))) {
        setCurrentMonth(minMaxDate?.max)
      } else {
        setCurrentMonth(newDate)
      }
      setCalendarState('months')
    },
    [year, minMaxDate, setCalendarState, setCurrentMonth],
  )

  useEffect(() => {
    if (year && scrollRef.current) {
      const container = scrollRef.current.querySelector('.ContentWrap') as HTMLElement | null
      const selectedTab = scrollRef.current.querySelector('.selected') as HTMLElement | null

      if (selectedTab && container) {
        const selectedTop = selectedTab.offsetTop
        const containerHeight = container.clientHeight
        const selectedHeight = selectedTab.clientHeight
        const scrollPosition = selectedTop - containerHeight / 2 + selectedHeight / 2
        container.scrollTop = scrollPosition
      }
    }
  }, [year])

  return (
    <ScrollShadow height={scrollHeight[size]} gutter padding="px-2" ref={scrollRef}>
      <div
        className={cn('YearPicker', 'grid grid-cols-5 gap-1')}
        role="grid"
        data-testid="YearPicker"
        ref={gridRef}
      >
        {yearRows.map(row => (
          <div key={String([row[0], row[4]])} className="contents" role="row">
            {row.map(y => {
              const isDisabled =
                (minMaxDate?.min && getYear(minMaxDate?.min) > getYear(y)) ||
                (minMaxDate?.max && getYear(minMaxDate?.max) < getYear(y))
              return (
                <Button
                  key={y.toDateString()}
                  className={cn(
                    'DateButton',
                    'w-full border-none font-normal',
                    isDisabled && 'disabled',
                    disabledClassVariant[variant],
                    isSameYear(y, year) && 'selected shadow-ring',
                    buttonClassName,
                  )}
                  variant={variant}
                  color={color}
                  size={size}
                  startIcon={format(y, 'yyyy')}
                  aria-label={format(y, 'yyyy')}
                  hideShadow
                  aria-disabled={isDisabled || undefined}
                  tabIndex={-1}
                  role="gridcell"
                  aria-selected={isSameYear(y, year)}
                  aria-current={isSameYear(y, new Date()) ? 'date' : undefined}
                  onClick={() => !isDisabled && handleYearChange(y)}
                  {...restButtonProps}
                />
              )
            })}
          </div>
        ))}
      </div>
    </ScrollShadow>
  )
}

YearPicker.displayName = 'YearPicker'
