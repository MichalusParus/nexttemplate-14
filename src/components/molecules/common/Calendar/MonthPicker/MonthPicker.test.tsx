import '@testing-library/jest-dom'

import { addMonths, startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'

import { defaultTestDate } from '@/components/molecules/form/comboboxes/DatePickerField/DatePicker/DatePicker.test'

import { fireEvent, render, screen, within } from '../../../../../../.jest/customRender'
import { MonthPicker } from '.'

expect.extend(toHaveNoViolations)

describe('MonthPicker', () => {
  describe('Semantics', () => {
    it('renders grid with rows and cells', () => {
      render(
        <MonthPicker
          month={defaultTestDate}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const grid = screen.getByRole('grid')
      const rows = screen.getAllByRole('row')
      const cells = screen.getAllByRole('gridcell')

      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid grid-cols-3')
      expect(rows).toHaveLength(4)
      expect(rows[0]).toHaveClass('contents')
      rows.forEach(row => {
        expect(within(row).getAllByRole('gridcell')).toHaveLength(3)
      })
      expect(cells).toHaveLength(12)
    })

    it('first cell labeled January', () => {
      render(
        <MonthPicker
          month={defaultTestDate}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const cells = screen.getAllByRole('gridcell')

      expect(cells[0]).toHaveTextContent('January')
      expect(cells[0]).toHaveAttribute('aria-label', 'January')
    })

    it('selected month marked', () => {
      render(
        <MonthPicker
          month={defaultTestDate}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const cells = screen.getAllByRole('gridcell')

      expect(cells[2]).toHaveClass('selected')
      expect(cells[2]).toHaveAttribute('aria-selected')
      expect(cells[0]).toHaveAttribute('aria-selected', 'false')
    })

    it('minMax disables months outside range', () => {
      render(
        <MonthPicker
          month={defaultTestDate}
          minMaxDate={{
            min: addMonths(startOfDay(defaultTestDate), -1),
            max: addMonths(startOfDay(defaultTestDate), 1),
          }}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const cells = screen.getAllByRole('gridcell')

      expect(cells[0]).toHaveAttribute('aria-disabled', 'true')
      expect(cells[4]).toHaveAttribute('aria-disabled', 'true')
    })

    it('buttonProps forwarding', () => {
      render(
        <MonthPicker
          month={defaultTestDate}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
          buttonProps={{ className: 'className' }}
        />,
      )
      const cells = screen.getAllByRole('gridcell')

      expect(cells[0]).toHaveClass('className')
      expect(cells[1]).toHaveClass('className')
    })
  })

  describe('Interaction', () => {
    it('click sets month and switches to days', () => {
      const spy = jest.fn()
      render(<MonthPicker month={defaultTestDate} setCalendarState={spy} setCurrentMonth={spy} />)
      const cells = screen.getAllByRole('gridcell')

      fireEvent.click(cells[2])
      expect(spy).toHaveBeenCalledTimes(2)
      expect(spy).toHaveBeenCalledWith(startOfDay(defaultTestDate))
      expect(spy).toHaveBeenCalledWith('days')
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <MonthPicker
          month={defaultTestDate}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
