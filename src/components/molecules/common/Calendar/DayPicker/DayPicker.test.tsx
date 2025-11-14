import '@testing-library/jest-dom'

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen, within } from '../../../../../../.jest/customRender'
import { DayPicker } from '.'
import { DateButtonType } from '.'

expect.extend(toHaveNoViolations)

const getDaysInMonth = (weekStart: 0 | 1) => {
  const daysToDisplay = eachDayOfInterval({
    start: startOfWeek(startOfMonth(new Date('2023-01-15')), { weekStartsOn: weekStart }),
    end: endOfWeek(endOfMonth(new Date('2023-01-15')), { weekStartsOn: weekStart }),
  })
    .map((day, index) => ({
      day,
      isSelected: index === 0,
      isCurrent: isSameMonth(day, new Date('2023-01-15')),
      isDisabled: index === 5,
    }))
    .reduce((weeks: DateButtonType[][], day, index: number) => {
      if (index % 7 === 0) {
        weeks.push([day])
      } else {
        weeks[weeks.length - 1].push(day)
      }
      return weeks
    }, [])
  return daysToDisplay
}

describe('DayPicker', () => {
  it('default', () => {
    render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />)
    const gridRole = screen.getByRole('grid')
    const rowRoles = screen.getAllByRole('row')
    const headerRoles = screen.getAllByRole('columnheader')
    const cellRoles = screen.getAllByRole('gridcell')

    expect(gridRole).toBeInTheDocument()
    expect(gridRole).toHaveClass('grid grid-cols-7')
    expect(rowRoles).toHaveLength(7)
    expect(rowRoles[0]).toHaveClass('contents')
    rowRoles.forEach((row, i) => {
      if (i === 0) {
        expect(within(row).getAllByRole('columnheader')).toHaveLength(7)
      } else {
        expect(within(row).getAllByRole('gridcell')).toHaveLength(7)
      }
    })
    expect(cellRoles).toHaveLength(42)
    expect(headerRoles[0]).toHaveTextContent('Mon')
    expect(cellRoles[0]).toHaveTextContent('26')
    expect(cellRoles[0]).toHaveClass('selected')
    expect(cellRoles[0]).toHaveAttribute('aria-selected')
    expect(cellRoles[1]).toHaveAttribute('aria-selected', 'false')
    expect(cellRoles[5]).toHaveAttribute('disabled')
  })

  it('weekStart', () => {
    render(<DayPicker daysInMonth={getDaysInMonth(0)} weekStart={0} onChange={() => {}} />)
    const headerRoles = screen.getAllByRole('columnheader')
    const cellRoles = screen.getAllByRole('gridcell')

    expect(headerRoles[0]).toHaveTextContent('Sun')
    expect(cellRoles[0]).toHaveTextContent('1')
  })

  it('buttonProps', () => {
    render(
      <DayPicker
        daysInMonth={getDaysInMonth(0)}
        weekStart={0}
        buttonProps={{ className: 'className' }}
        onChange={() => {}}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')

    expect(cellRoles[0]).toHaveClass('className')
    expect(cellRoles[20]).toHaveClass('className')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={spy} />)
    const cellRoles = screen.getAllByRole('gridcell')

    fireEvent.click(cellRoles[0])
    expect(spy).toHaveBeenCalledWith(getDaysInMonth(1)[0][0].day)
  })

  it('axe', async () => {
    const { container } = render(
      <DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
