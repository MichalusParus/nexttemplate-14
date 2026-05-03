import { ReactNode } from 'react'

import { StyleProps } from '@/components/utils/types'

/** Top-level view mode controlled by the consumer. */
export type CalendarView = 'day' | 'week' | 'month' | 'year'

/** Drill-down state inside `view='day'`: month grid → month picker → year picker. */
export type CalendarState = 'days' | 'months' | 'years'

/** Pre-computed flags for a single day cell. */
export type DateButtonType = {
  day: Date
  isSelected?: boolean
  isCurrent?: boolean
  isDisabled?: boolean
}

/** Attributes a renderCell consumer must spread onto the cell wrapper to participate */
export type CalendarCellProps = {
  role: 'gridcell'
  tabIndex: -1
  'data-date': string
  'data-selected'?: true
  'aria-label': string
  'aria-selected': boolean
  'aria-current'?: 'date'
  'aria-disabled'?: true
  onClick: () => void
}

export type CalendarCellCtx = Omit<DateButtonType, 'isCurrent'> & {
  isCurrent: boolean
  isToday: boolean
  variant: NonNullable<StyleProps['variant']>
  color: NonNullable<StyleProps['color']>
  size: NonNullable<StyleProps['size']>
  cellProps: CalendarCellProps
}

export type RenderCalendarCell = (ctx: CalendarCellCtx) => ReactNode
