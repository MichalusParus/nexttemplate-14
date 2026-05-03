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
import type { DateButtonType } from '../types'
import { DayPicker } from '.'

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
  describe('Semantics', () => {
    it('renders grid with rows and cells', () => {
      render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />)
      const grid = screen.getByRole('grid')
      const rows = screen.getAllByRole('row')
      const cells = screen.getAllByRole('gridcell')

      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid grid-cols-7')
      expect(rows).toHaveLength(7)
      expect(rows[0]).toHaveClass('contents')
      rows.forEach((row, i) => {
        if (i === 0) {
          expect(within(row).getAllByRole('columnheader')).toHaveLength(7)
        } else {
          expect(within(row).getAllByRole('gridcell')).toHaveLength(7)
        }
      })
      expect(cells).toHaveLength(42)
    })

    it('column headers start with Monday', () => {
      render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />)
      const headers = screen.getAllByRole('columnheader')

      expect(headers[0]).toHaveTextContent('Mon')
    })

    it('selected cell marked', () => {
      render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />)
      const cells = screen.getAllByRole('gridcell')

      expect(cells[0]).toHaveTextContent('26')
      expect(cells[0]).toHaveAttribute('data-selected')
      expect(cells[0]).toHaveAttribute('aria-selected')
      expect(cells[1]).toHaveAttribute('aria-selected', 'false')
    })

    it('disabled cell marked', () => {
      render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />)
      const cells = screen.getAllByRole('gridcell')

      expect(cells[5]).toHaveAttribute('aria-disabled', 'true')
    })

    it('weekStart changes first day', () => {
      render(<DayPicker daysInMonth={getDaysInMonth(0)} weekStart={0} onChange={() => {}} />)
      const headers = screen.getAllByRole('columnheader')
      const cells = screen.getAllByRole('gridcell')

      expect(headers[0]).toHaveTextContent('Sun')
      expect(cells[0]).toHaveTextContent('1')
    })

    it('buttonProps forwarding', () => {
      render(
        <DayPicker
          daysInMonth={getDaysInMonth(0)}
          weekStart={0}
          buttonProps={{ className: 'className' }}
          onChange={() => {}}
        />,
      )
      const cells = screen.getAllByRole('gridcell')

      expect(cells[0]).toHaveClass('className')
      expect(cells[20]).toHaveClass('className')
    })
  })

  describe('Interaction', () => {
    it('onChange fires on click', () => {
      const spy = jest.fn()
      render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={spy} />)
      const cells = screen.getAllByRole('gridcell')

      fireEvent.click(cells[0])
      expect(spy).toHaveBeenCalledWith(getDaysInMonth(1)[0][0].day)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
