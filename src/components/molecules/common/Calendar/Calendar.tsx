'use client'
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns'
import { useTranslations } from 'next-intl'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import { iconOnlySize } from '@/components/atoms/common/Button/Button.style'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { ChevronIcon } from '@/components/atoms/icons'
import { P } from '@/components/atoms/typography/P'
import { StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { calendarSize, scrollHeight } from './Calendar.styles'

export type CalendarProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** optional name for id */
  name?: string
  /** current selected date */
  date?: Date
  /** optional range object for selecting range of dates */
  range?: { start?: Date; end?: Date }
  /** optional multiValue for selecting multiple dates */
  multiValue?: Date[]
  /** setting start of week, 0 for Sunday, 1 for Monday */
  weekStart?: 0 | 1
  /** readOnly mode for calendar */
  readOnly?: boolean
  /** optional min max date for calendar */
  minMaxDate?: { min?: Date; max?: Date }
  /** for passing unavailable, unselectable dates */
  unavailable?: Date[]
  /** enable useFocus hook for calendar */
  enableUseFocus?: boolean
  /** optional combobox props for select combobox */
  buttonProps?: Partial<ButtonProps>
  /** for passing aditional props to dropdown */
  paperProps?: Partial<PaperProps>
  /** onChange function */
  onChange: (date: Date) => void
}

/** Component for choosing date with month selection. Default HTMLAttributes props supported. USE CLIENT */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      name,
      date,
      range,
      multiValue,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      weekStart = 1,
      readOnly,
      minMaxDate,
      unavailable,
      enableUseFocus,
      buttonProps = {},
      paperProps = {},
      onChange,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [calendarState, setCalendarState] = useState<'days' | 'months'>('days')
    const [currentMonth, setCurrentMonth] = useState<Date>(date || new Date())
    const [daysInMonth, setDaysInMonth] = useState<Date[]>([])
    const dailyFocus = useFocus(
      !!enableUseFocus && calendarState === 'days' && !readOnly,
      componentRef,
      [
        '.DatePickerCombobox',
        '.PreviousMonthButton',
        '.MonthSelect',
        '.NextMonthButton',
        '.DateButton',
      ],
      () => {},
      {
        value: calendarState,
        gridColumns: 7,
      },
    )
    const monthFocus = useFocus(
      !!enableUseFocus && calendarState === 'months' && !readOnly,
      componentRef,
      ['.MonthButton'],
      () => {},
      {
        value: calendarState,
        gridColumns: 6,
      },
    )
    const daysInWeek = eachDayOfInterval({
      start: startOfWeek(new Date(), { weekStartsOn: weekStart }),
      end: endOfWeek(new Date(), { weekStartsOn: weekStart }),
    })
    const monthsList = eachMonthOfInterval({
      start: startOfMonth(startOfYear(addYears(new Date(), -10))),
      end: endOfMonth(endOfYear(addYears(new Date(), 10))),
    })

    const handleOnChange = (value: Date) => {
      onChange(value)
      setCurrentMonth(value)
    }

    const isSelected = useCallback(
      (day: Date) => {
        const selected = date && isSameDay(day, date)
        const inRange =
          range?.start &&
          range?.end &&
          isWithinInterval(day, { start: range.start, end: range.end }) &&
          !unavailable?.some(d => isSameDay(day, d))
        const multiSelected = multiValue && multiValue.some(v => isSameDay(day, v))
        return selected || inRange || multiSelected
      },
      [date, range, multiValue, unavailable],
    )

    const getDaysInMonth = useCallback(() => {
      const daysToDisplay = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: weekStart }),
        end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: weekStart }),
      })
      setDaysInMonth(daysToDisplay)
    }, [currentMonth, weekStart])

    useEffect(() => {
      getDaysInMonth()
    }, [currentMonth, getDaysInMonth])

    useEffect(() => {
      if (calendarState === 'months') {
        const selectedTab = scrollRef?.current?.querySelector('.selected')
        selectedTab?.scrollIntoView({ behavior: 'auto', block: 'center' })
      }
      // const selectedItem = focusableEl.find(el => el.className.includes(' selected '))
      // selectedItem?.focus()
      // focusIndexRef.current = selectedItem
      //   ? focusableEl.indexOf(selectedItem)
      //   : focusIndexRef.current
    }, [calendarState])

    return (
      <div
        id={name}
        className={cn('Calendar relative', className)}
        ref={componentRef}
        data-testid="Calendar"
      >
        <Paper
          className={cn(calendarSize[size], paperProps.className)}
          variant={variant}
          color={color}
          padding="p-2"
          hideShadow
          {...filterOutKeys(paperProps, ['className'])}
        >
          <div className={cn('CalendarHeader', 'flex items-center justify-between pb-2')}>
            <Button
              className={cn('PreviousMonthButton', 'border-none', readOnly && 'invisible')}
              variant={variant}
              color={color}
              size={size}
              startIcon={<ChevronIcon className="rotate-90" />}
              hideShadow
              disabled={minMaxDate?.min && isSameMonth(currentMonth, minMaxDate?.min)}
              aria-label={t('previousPage', { page: format(addMonths(currentMonth, -1), 'MMMM') })}
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            />
            <Button
              className={cn('MonthSelect', 'border-none font-semibold')}
              variant={variant}
              color={color}
              size={size}
              disableUpperCase
              hideShadow
              onClick={() => setCalendarState(calendarState === 'days' ? 'months' : 'days')}
            >
              {format(currentMonth, 'MMMM yyyy')}
              <ChevronIcon
                className={cn(
                  'text-inherit transition-transform',
                  calendarState === 'months' && 'rotate-180',
                )}
              />
            </Button>
            <Button
              className={cn('NextMonthButton', 'border-none', readOnly && 'invisible')}
              variant={variant}
              color={color}
              size={size}
              startIcon={<ChevronIcon className="-rotate-90" />}
              hideShadow
              disabled={minMaxDate?.max && isSameMonth(currentMonth, minMaxDate?.max)}
              aria-label={t('nextPage', { page: format(addMonths(currentMonth, 1), 'MMMM') })}
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            />
          </div>
          <div className={cn('CalendarContent', 'grid grid-cols-7 gap-1')}>
            {calendarState === 'days' &&
              daysInWeek.map(day => (
                <div
                  key={day.toDateString()}
                  className="flex items-center justify-center px-0.5 font-semibold"
                >
                  <P size={size}>{format(day, 'eee')}</P>
                </div>
              ))}
            {calendarState === 'days' &&
              daysInMonth.map(day => (
                <div key={day.toDateString()} className="flex items-center justify-center">
                  {!readOnly ? (
                    <Button
                      className={cn(
                        'DateButton',
                        'w-full border-none font-normal',
                        isSelected(day) && 'selected shadow-ring',
                        !isSameMonth(day, currentMonth) && 'opacity-50',
                        buttonProps.className,
                      )}
                      variant={variant}
                      color={color}
                      size={size}
                      startIcon={format(day, 'd')}
                      hideShadow
                      tabIndex={-1}
                      disabled={
                        (minMaxDate?.min && isBefore(day, minMaxDate?.min)) ||
                        (minMaxDate?.max && isAfter(day, minMaxDate?.max)) ||
                        (unavailable && unavailable?.some(d => isSameDay(day, d)))
                      }
                      onClick={() => handleOnChange(day)}
                      {...filterOutKeys(buttonProps, ['className'])}
                    />
                  ) : (
                    <P
                      className={cn(
                        'DateButton',
                        'flex w-full items-center justify-center rounded-md',
                        iconOnlySize[size],
                        date && isSameDay(day, date) && 'shadow-ring',
                        !isSameMonth(day, currentMonth) && 'opacity-50',
                        range?.start &&
                          range?.end &&
                          isWithinInterval(day, { start: range.start, end: range.end }) &&
                          'selected shadow-ring',
                      )}
                      color={color}
                      size={size}
                    >
                      {format(day, 'd')}
                    </P>
                  )}
                </div>
              ))}
            {calendarState === 'months' && (
              <ScrollShadow
                className="col-span-7 [&_.ContentWrap]:grid [&_.ContentWrap]:grid-cols-6"
                height={scrollHeight[size]}
                gutter
                ref={scrollRef}
              >
                {monthsList.map(month => (
                  <Button
                    key={month.toDateString()}
                    className={cn(
                      'MonthButton',
                      'max-w-14 whitespace-normal border-none font-normal',
                      isSameMonth(month, currentMonth) && 'selected shadow-ring',
                    )}
                    variant={variant}
                    color={color}
                    size={size}
                    startIcon={format(month, 'MMM yyyy')}
                    hideShadow
                    tabIndex={-1}
                    disabled={
                      (minMaxDate?.min && isBefore(endOfMonth(month), minMaxDate?.min)) ||
                      (minMaxDate?.max && isAfter(startOfMonth(month), minMaxDate?.max))
                    }
                    onClick={() => {
                      setCurrentMonth(month), setCalendarState('days')
                    }}
                  />
                ))}
              </ScrollShadow>
            )}
          </div>
        </Paper>
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'
