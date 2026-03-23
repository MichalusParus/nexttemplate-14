import '@testing-library/jest-dom'

import { addYears } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'

import { defaultTestDate } from '@/components/molecules/form/comboboxes/DatePickerField/DatePicker/DatePicker.test'

import { fireEvent, render, screen, within } from '../../../../../../.jest/customRender'
import { YearPicker } from '.'

expect.extend(toHaveNoViolations)


describe('YearPicker', () => {
  describe('Semantics', () => {
    it('renders grid with rows and cells', () => {
      render(
        <YearPicker year={defaultTestDate} setCalendarState={() => {}} setCurrentMonth={() => {}} />,
      )
      const grid = screen.getByRole('grid')
      const rows = screen.getAllByRole('row')
      const cells = screen.getAllByRole('gridcell')
      const selected = screen.getByText('2023')

      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid grid-cols-5')
      expect(rows[0]).toHaveClass('contents')
      rows.forEach((row, i) => {
        if (i !== rows.length - 1) {
          expect(within(row).getAllByRole('gridcell')).toHaveLength(5)
        }
      })
      expect(cells.length).toBeGreaterThan(0)
      expect(selected).toHaveClass('selected')
      expect(selected).toHaveAttribute('aria-selected')
    })

    it('minMax limits year range', () => {
      render(
        <YearPicker
          year={defaultTestDate}
          minMaxDate={{ min: addYears(defaultTestDate, -1), max: addYears(defaultTestDate, 1) }}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const previousYear = screen.queryByText('2021')
      const nextYear = screen.queryByText('2025')

      expect(previousYear).toBeNull()
      expect(nextYear).toBeNull()
    })

    it('buttonProps forwarding', () => {
      render(
        <YearPicker
          year={defaultTestDate}
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
    it('click sets year and switches to months', () => {
      const spy = jest.fn()
      render(<YearPicker year={defaultTestDate} setCalendarState={spy} setCurrentMonth={spy} />)
      const currentYear = screen.getByText('2023')

      fireEvent.click(currentYear)
      expect(spy).toHaveBeenCalledTimes(2)
      expect(spy).toHaveBeenCalledWith(defaultTestDate)
      expect(spy).toHaveBeenCalledWith('months')
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <YearPicker year={defaultTestDate} setCalendarState={() => {}} setCurrentMonth={() => {}} />,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
