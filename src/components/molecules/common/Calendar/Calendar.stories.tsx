import type { Meta, StoryObj } from '@storybook/nextjs'
import { addDays, addMonths, format, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns'
import { useState } from 'react'

import { cn } from '@/utils/utils'

import { Calendar } from '.'
import { CalendarProps } from './Calendar'
import type { CalendarCellCtx } from './types'

const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Common/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const CalendarWithHooks = (args: CalendarProps) => {
  const [date, setDate] = useState<Date>(args.date || new Date())
  return <Calendar {...args} date={date} onChange={setDate} />
}

const RangeCalendarWithHooks = (args: CalendarProps) => {
  const [range, setRange] = useState<{ start?: Date; end?: Date } | undefined>(args.range)
  const handleChange = (value: Date) => {
    if (!range?.start || (range.start && range.end)) {
      setRange({ start: value, end: undefined })
      return
    } else if (isSameDay(range.start, value)) {
      setRange(undefined)
    } else if (range?.start && !range.end && isBefore(range.start, value)) {
      setRange(prev => ({ start: prev?.start, end: value }))
      return
    } else if (range?.start && !range.end && isAfter(range.start, value)) {
      setRange(prev => ({ start: value, end: prev?.start }))
      return
    }
  }
  return <Calendar {...args} date={range?.start} range={range} onChange={handleChange} />
}

const MultiCalendarWithHooks = (args: CalendarProps) => {
  const [values, setValues] = useState<Date[]>(args.multiValue || [])
  const handleChange = (date: Date) => {
    if (values?.some(v => isSameDay(v, date))) {
      setValues(values.filter(v => !isSameDay(v, date)))
    } else {
      setValues([...values, date])
    }
  }
  return <Calendar {...args} date={values?.[0]} multiValue={values} onChange={handleChange} />
}

export default meta
type Story = StoryObj<typeof Calendar>

const defaultArgs: Partial<CalendarProps> = {
  className: 'className',
  name: 'calendarStory',
  date: new Date(),
  range: undefined,
  multiValue: undefined,
  variant: 'outlined',
  color: 'primary',
  size: 'md',
  view: 'day',
  weekStart: 1,
  minMaxDate: undefined,
  unavailable: [],
  isActive: true,
  focusOnOpen: false,
  showHeader: true,
  showToday: false,
  showWeekdayHeader: true,
  buttonProps: undefined,
  paperProps: undefined,
}

export const PrimaryDefault: Story = {
  args: defaultArgs,
  render: args => <CalendarWithHooks {...args} />,
}

export const MinMaxDate: Story = {
  args: {
    ...defaultArgs,
    minMaxDate: { min: addMonths(new Date(), -2), max: addMonths(new Date(), 2) },
  },
  render: args => <CalendarWithHooks {...args} />,
}

export const Unavailable: Story = {
  args: {
    ...defaultArgs,
    unavailable: [addDays(new Date(), -2), addDays(new Date(), 2), addDays(new Date(), 4)],
  },
  render: args => <CalendarWithHooks {...args} />,
}

export const Range: Story = {
  args: {
    ...defaultArgs,
    range: { start: addDays(new Date(), -2), end: addDays(new Date(), 2) },
  },
  render: args => <RangeCalendarWithHooks {...args} />,
}

export const MultiValue: Story = {
  args: {
    ...defaultArgs,
    multiValue: [addDays(new Date(), -2), new Date(), addDays(new Date(), 2)],
  },
  render: args => <MultiCalendarWithHooks {...args} />,
}

const CustomCellCalendar = (args: CalendarProps) => {
  const [date, setDate] = useState<Date>(args.date || new Date())
  const renderCell = (ctx: CalendarCellCtx) => (
    <button
      type="button"
      {...ctx.cellProps}
      className="hover:bg-primary-100 dark:hover:bg-primary-900/40 focus-visible:ring-primary-500 data-selected:shadow-ring flex flex-col items-center gap-0.5 rounded p-1 focus-visible:ring-2 focus-visible:outline-none"
    >
      <span>{format(ctx.day, 'd')}</span>
      {ctx.day.getDate() % 3 === 0 && <span className="bg-primary-500 h-1 w-1 rounded-full" />}
    </button>
  )
  return <Calendar {...args} date={date} onChange={setDate} renderCell={renderCell} />
}

export const CustomRenderCell: Story = {
  args: defaultArgs,
  render: args => <CustomCellCalendar {...args} />,
}

export const WeekView: Story = {
  args: { ...defaultArgs, view: 'week', showToday: true },
  render: args => <CalendarWithHooks {...args} />,
}

const DayStripCalendar = (args: CalendarProps) => {
  const today = startOfDay(new Date())
  const [date, setDate] = useState<Date>(args.date || today)
  const renderCell = (ctx: CalendarCellCtx) => {
    const { day, isSelected, isToday, cellProps } = ctx
    const isPast = isBefore(startOfDay(day), today) && !isToday
    return (
      <button
        type="button"
        {...cellProps}
        className={cn(
          'flex w-full min-w-0 flex-col items-center justify-center gap-1 rounded-md px-1 py-2 transition-colors',
          'hover:bg-primary-50 dark:hover:bg-primary-900/40 focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:outline-none',
          isPast && !isSelected && 'opacity-60',
          isSelected && 'bg-primary-100 ring-primary-600 dark:bg-primary-900/60 ring-2',
          isToday && !isSelected && 'text-primary-700 dark:text-primary-300 font-semibold',
        )}
      >
        <span className="text-[0.65rem] tracking-wide uppercase">{format(day, 'EEEEEE')}</span>
        <span className={cn('text-base leading-none', isToday && 'font-bold')}>
          {format(day, 'd')}
        </span>
        <span className="flex h-1.5 items-center gap-0.5">
          {day.getDate() % 2 === 0 &&
            Array.from({ length: Math.min(day.getDate() % 4, 3) }, (_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  isSelected
                    ? 'bg-primary-700 dark:bg-primary-200'
                    : 'bg-primary-500 dark:bg-primary-400',
                )}
              />
            ))}
        </span>
      </button>
    )
  }
  return <Calendar {...args} date={date} onChange={setDate} renderCell={renderCell} />
}

export const WeekViewCustomCell: Story = {
  args: { ...defaultArgs, view: 'week', showToday: true, showWeekdayHeader: false },
  render: args => <DayStripCalendar {...args} />,
}

export const MonthView: Story = {
  args: { ...defaultArgs, view: 'month' },
  render: args => <CalendarWithHooks {...args} />,
}

export const YearView: Story = {
  args: { ...defaultArgs, view: 'year' },
  render: args => <CalendarWithHooks {...args} />,
}
