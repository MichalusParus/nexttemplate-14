import '@testing-library/jest-dom'

import { addMonths } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { CalendarHeader } from '.'

expect.extend(toHaveNoViolations)

describe('CalendarHeader', () => {
  describe('Semantics', () => {
    it('renders three buttons', () => {
      const date = new Date('2023-01-01')
      render(
        <CalendarHeader
          currentMonth={date}
          calendarState="days"
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const header = screen.getByTestId('CalendarHeader')
      const buttons = screen.getAllByRole('button')

      expect(header).toBeInTheDocument()
      expect(buttons).toHaveLength(3)
    })

    it('displays month and year', () => {
      const date = new Date('2023-01-01')
      render(
        <CalendarHeader
          currentMonth={date}
          calendarState="days"
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const label = screen.getByText('January 2023')

      expect(label).toBeInTheDocument()
    })

    it('minMaxDate disables prev and next', () => {
      const date = new Date('2023-01-15')
      const minMax = { min: new Date('2023-01-14'), max: new Date('2023-01-16') }
      render(
        <CalendarHeader
          currentMonth={date}
          calendarState="days"
          minMaxDate={minMax}
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[2]).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Interaction', () => {
    it('monthSelect toggles from days to years', () => {
      const date = new Date('2023-01-15')
      const spy = jest.fn()
      render(
        <CalendarHeader
          currentMonth={date}
          calendarState="days"
          setCalendarState={spy}
          setCurrentMonth={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(spy).toHaveBeenCalledWith('years')
    })

    it('monthSelect toggles from years to days', () => {
      const date = new Date('2023-01-15')
      const spy = jest.fn()
      render(
        <CalendarHeader
          currentMonth={date}
          calendarState="years"
          setCalendarState={spy}
          setCurrentMonth={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(spy).toHaveBeenCalledWith('days')
    })

    it('prev and next buttons change month', () => {
      const date = new Date('2023-01-15')
      const spy = jest.fn()
      render(
        <CalendarHeader
          currentMonth={date}
          calendarState="days"
          setCalendarState={() => {}}
          setCurrentMonth={spy}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(spy).toHaveBeenCalledWith(addMonths(date, -1))
      fireEvent.click(buttons[2])
      expect(spy).toHaveBeenCalledWith(addMonths(date, 1))
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <CalendarHeader
          currentMonth={new Date()}
          calendarState="days"
          setCalendarState={() => {}}
          setCurrentMonth={() => {}}
        />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
