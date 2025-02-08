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
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { StyleProps } from '@/components/types'
import { cn, filterOutKeys } from '@/utils/utils'

import { scrollHeight } from '../Calendar.styles'

export type YearPickerProps = StyleProps & {
  /** current year */
  year: Date
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** optional combobox props for select combobox */
  buttonProps?: Partial<ButtonProps>
  /** onChange function */
  onChange: (date: Date) => void
}

/** Year picker subcomponent for calendar. USE CLIENT */
export const YearPicker = ({
  year,
  minMaxDate,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  buttonProps = {},
  onChange,
}: YearPickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
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
        onChange(minMaxDate?.min)
      } else if (minMaxDate?.max && isAfter(startOfMonth(newDate), startOfMonth(minMaxDate?.max))) {
        onChange(minMaxDate?.max)
      } else {
        onChange(newDate)
      }
    },
    [year, minMaxDate, onChange],
  )

  useEffect(() => {
    if (year) {
      const selectedTab = scrollRef?.current?.querySelector('.selected')
      selectedTab?.scrollIntoView({ behavior: 'auto', block: 'center' })
    }
  }, [year])

  return (
    <ScrollShadow height={scrollHeight[size]} gutter ref={scrollRef}>
      <div
        className={cn('YearPicker', 'grid grid-cols-5 gap-1')}
        role="grid"
        data-testid="YearPicker"
      >
        {yearRows.map(row => (
          <div key={String([row[0], row[4]])} className="contents" role="row">
            {row.map(y => (
              <Button
                key={y.toDateString()}
                className={cn(
                  'DateButton',
                  'w-full border-none font-normal',
                  isSameYear(y, year) && 'selected shadow-ring',
                  buttonProps.className,
                )}
                variant={variant}
                color={color}
                size={size}
                startIcon={format(y, 'yyyy')}
                aria-label={format(y, 'yyyy')}
                hideShadow
                disabled={
                  (minMaxDate?.min && getYear(minMaxDate?.min) > getYear(y)) ||
                  (minMaxDate?.max && getYear(minMaxDate?.max) < getYear(y))
                }
                tabIndex={-1}
                role="gridcell"
                aria-selected={isSameYear(y, year)}
                aria-current={isSameYear(y, new Date()) ? 'date' : undefined}
                onClick={() => handleYearChange(y)}
                {...filterOutKeys(buttonProps, ['className'])}
              />
            ))}
          </div>
        ))}
      </div>
    </ScrollShadow>
  )
}

YearPicker.displayName = 'YearPicker'
