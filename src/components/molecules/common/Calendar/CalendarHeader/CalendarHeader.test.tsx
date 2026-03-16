import '@testing-library/jest-dom'

import { addMonths } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { CalendarHeader } from '.'

expect.extend(toHaveNoViolations)

describe('CalendarHeader', () => {
  it('default', () => {
    const date = new Date('2023-01-01')
    render(
      <CalendarHeader
        currentMonth={date}
        calendarState="days"
        setCalendarState={() => {}}
        setCurrentMonth={() => {}}
      />,
    )
    const calendarHeaderTestId = screen.getByTestId('CalendarHeader')
    const buttonRoles = screen.getAllByRole('button')
    const buttonText = screen.getByText('January 2023')

    expect(calendarHeaderTestId).toBeInTheDocument()
    expect(buttonRoles).toHaveLength(3)
    expect(buttonText).toBeInTheDocument()
  })

  it('minMaxDate', () => {
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
    const buttonRoles = screen.getAllByRole('button')

    expect(buttonRoles[0]).toHaveAttribute('aria-disabled', 'true')
    expect(buttonRoles[2]).toHaveAttribute('aria-disabled', 'true')
  })

  it('setCalendarStateDays', () => {
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
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[1])
    expect(spy).toHaveBeenCalledWith('years')
  })

  it('setCalendarStateYears', () => {
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
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[1])
    expect(spy).toHaveBeenCalledWith('days')
  })

  it('setCurrentMonth', () => {
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
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[0])
    expect(spy).toHaveBeenCalledWith(addMonths(date, -1))
    fireEvent.click(buttonRoles[2])
    expect(spy).toHaveBeenCalledWith(addMonths(date, 1))
  })

  it('axe', async () => {
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
