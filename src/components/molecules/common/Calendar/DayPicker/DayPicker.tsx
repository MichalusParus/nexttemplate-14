'use client'
import { format, isSameDay } from 'date-fns'
import { Fragment, MutableRefObject } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { disabledVariant } from '@/components/utils/common.style'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import type { CalendarCellProps, DateButtonType, RenderCalendarCell } from '../types'
import { WeekdayHeader } from './WeekdayHeader'

const buildCellProps = (
  { day, isSelected, isDisabled }: DateButtonType,
  onSelect: () => void,
): CalendarCellProps => ({
  role: 'gridcell',
  tabIndex: -1,
  'data-date': day.toISOString(),
  'data-selected': isSelected || undefined,
  'aria-label': format(day, 'EEEE, MMMM do, yyyy'),
  'aria-selected': !!isSelected,
  'aria-current': isSameDay(day, new Date()) ? 'date' : undefined,
  'aria-disabled': isDisabled || undefined,
  onClick: () => {
    if (!isDisabled) onSelect()
  },
})

export type DayPickerProps = StyleProps & {
  /** days in current month */
  daysInMonth: DateButtonType[][]
  /** setting start of week, 0 for Sunday, 1 for Monday */
  weekStart?: 0 | 1
  /** optional combobox props for select combobox */
  buttonProps?: Partial<ButtonProps>
  /** ref for the grid container (used by useCalendarFocus) */
  gridRef?: MutableRefObject<HTMLDivElement | null>
  /** show the row of weekday-name column headers above the day cells (default true) */
  showWeekdayHeader?: boolean
  /** custom render-prop for each day cell — receives selection state + a spreadable cellProps bag */
  renderCell?: RenderCalendarCell
  /** onChange function */
  onChange: (date: Date) => void
}

/** Day picker subcomponent for calendar. USE CLIENT */
export const DayPicker = ({
  daysInMonth,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  weekStart,
  buttonProps = {},
  gridRef,
  showWeekdayHeader = true,
  renderCell,
  onChange,
}: DayPickerProps) => {
  const { className: buttonClassName, ...restButtonProps } = buttonProps
  return (
    <div
      className={cn('DayPicker', 'grid grid-cols-7 gap-1')}
      role="grid"
      data-testid="DayPicker"
      ref={gridRef}
    >
      {showWeekdayHeader && <WeekdayHeader variant={variant} size={size} weekStart={weekStart} />}
      {daysInMonth.map((week, i) => (
        <div key={`week-${i}`} className="contents" role="row">
          {week.map(dateButton => {
            const { day, isSelected, isCurrent, isDisabled } = dateButton
            const cellProps = buildCellProps(dateButton, () => onChange(day))
            if (renderCell) {
              return (
                <Fragment key={day.toDateString()}>
                  {renderCell({
                    ...dateButton,
                    isCurrent: isCurrent ?? true,
                    isToday: isSameDay(day, new Date()),
                    variant,
                    color,
                    size,
                    cellProps,
                  })}
                </Fragment>
              )
            }
            return (
              <Button
                key={day.toDateString()}
                id={day.toDateString()}
                className={cn(
                  'DateButton',
                  'w-full font-normal',
                  variant !== 'contained' && 'text-text dark:text-contrast',
                  isDisabled && cn('disabled', disabledVariant[variant]),
                  !isCurrent && 'opacity-50',
                  buttonClassName,
                )}
                variant={variant}
                color={color}
                size={size}
                startIcon={format(day, 'd')}
                aria-label={cellProps['aria-label']}
                hideShadow
                hideBorder={!isSelected}
                tabIndex={-1}
                role="gridcell"
                data-selected={cellProps['data-selected']}
                data-date={cellProps['data-date']}
                aria-selected={cellProps['aria-selected']}
                aria-current={cellProps['aria-current']}
                aria-disabled={cellProps['aria-disabled']}
                onClick={cellProps.onClick}
                {...restButtonProps}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

DayPicker.displayName = 'DayPicker'
