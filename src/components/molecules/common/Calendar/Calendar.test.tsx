import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { defaultTestDate } from '../../form/comboboxes/DatePickerField/DatePicker/DatePicker.test'
import { Calendar } from '.'

expect.extend(toHaveNoViolations)

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Calendar', () => {
  it('default', () => {
    render(
      <Calendar
        className="className"
        name="calendarTest"
        date={defaultTestDate}
        onChange={() => {}}
      />,
    )
    const calendarTestId = screen.getByTestId('Calendar')
    const calendarHeaderTestId = screen.getByTestId('CalendarHeader')
    const dayPickerTestId = screen.getByTestId('DayPicker')
    const headerRoles = screen.getAllByRole('columnheader')
    const cellRoles = screen.getAllByRole('gridcell')
    const selectedText = screen.getByText('4')

    expect(calendarTestId).toBeInTheDocument()
    expect(calendarTestId).toHaveClass('className')
    expect(calendarTestId).toHaveAttribute('id', 'calendarTest')
    expect(calendarHeaderTestId).toBeInTheDocument()
    expect(dayPickerTestId).toBeInTheDocument()
    expect(selectedText).toHaveClass('selected')
    expect(headerRoles[0]).toHaveTextContent('Mon')
    expect(cellRoles[0]).toHaveTextContent('27')
    expect(selectedText).toHaveAttribute('aria-selected')
  })

  it('calendarStates', () => {
    render(<Calendar date={defaultTestDate} onChange={() => {}} />)
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[1])
    const yearPickerTestId = screen.getByTestId('YearPicker')
    expect(yearPickerTestId).toBeInTheDocument()
    const cellRoles = screen.getAllByRole('gridcell')
    fireEvent.click(cellRoles[0])
    const monthPickerTestId = screen.getByTestId('MonthPicker')
    expect(monthPickerTestId).toBeInTheDocument()
  })

  it('range', () => {
    render(
      <Calendar
        date={defaultTestDate}
        range={{ start: new Date('2023-03-03'), end: new Date('2023-03-05') }}
        onChange={() => {}}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')
    const selected1Text = screen.getByText('3')
    const selected2Text = screen.getByText('4')
    const selected3Text = screen.getByText('5')

    expect(cellRoles[0]).not.toHaveClass('selected')
    expect(cellRoles[0]).toHaveAttribute('aria-selected', 'false')
    expect(selected1Text).toHaveClass('selected')
    expect(selected1Text).toHaveAttribute('aria-selected')
    expect(selected2Text).toHaveClass('selected')
    expect(selected2Text).toHaveAttribute('aria-selected')
    expect(selected3Text).toHaveClass('selected')
    expect(selected3Text).toHaveAttribute('aria-selected')
    expect(cellRoles[20]).not.toHaveClass('selected')
    expect(cellRoles[20]).toHaveAttribute('aria-selected', 'false')
  })

  it('multiValue', () => {
    render(
      <Calendar
        date={new Date('2023-04-07')}
        multiValue={[new Date('2023-04-07'), new Date('2023-04-10'), new Date('2023-04-13')]}
        onChange={() => {}}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')
    const selected1Text = screen.getByText('7')
    const selected2Text = screen.getByText('10')
    const selected3Text = screen.getByText('13')

    expect(cellRoles[0]).not.toHaveClass('selected')
    expect(cellRoles[0]).toHaveAttribute('aria-selected', 'false')
    expect(selected1Text).toHaveClass('selected')
    expect(selected1Text).toHaveAttribute('aria-selected')
    expect(selected2Text).toHaveClass('selected')
    expect(selected2Text).toHaveAttribute('aria-selected')
    expect(selected3Text).toHaveClass('selected')
    expect(selected3Text).toHaveAttribute('aria-selected')
    expect(cellRoles[20]).not.toHaveClass('selected')
    expect(cellRoles[20]).toHaveAttribute('aria-selected', 'false')
  })

  it('weekStart', () => {
    render(<Calendar date={defaultTestDate} onChange={() => {}} weekStart={0} />)
    const headerRoles = screen.getAllByRole('columnheader')
    const cellRoles = screen.getAllByRole('gridcell')

    expect(headerRoles[0]).toHaveTextContent('Sun')
    expect(cellRoles[0]).toHaveTextContent('26')
  })

  it('unavailable', () => {
    render(
      <Calendar
        date={new Date('2023-04-07')}
        unavailable={[new Date('2023-04-07'), new Date('2023-04-10'), new Date('2023-04-13')]}
        onChange={() => {}}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')
    const selected1Text = screen.getByText('7')
    const selected2Text = screen.getByText('10')
    const selected3Text = screen.getByText('13')

    expect(cellRoles[0]).not.toHaveAttribute('aria-disabled')
    expect(selected1Text).toHaveAttribute('aria-disabled', 'true')
    expect(selected2Text).toHaveAttribute('aria-disabled', 'true')
    expect(selected3Text).toHaveAttribute('aria-disabled', 'true')
    expect(cellRoles[20]).not.toHaveAttribute('aria-disabled')
  })

  it('minMax', () => {
    render(
      <Calendar
        date={defaultTestDate}
        onChange={() => {}}
        minMaxDate={{ min: new Date('2023-03-01'), max: new Date('2023-03-31') }}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')
    const buttonRoles = screen.getAllByRole('button')

    expect(cellRoles[1]).toHaveAttribute('aria-disabled', 'true')
    expect(cellRoles[34]).toHaveAttribute('aria-disabled', 'true')
    expect(buttonRoles[0]).toHaveAttribute('disabled')
    expect(buttonRoles[1]).toHaveAttribute('disabled')
    expect(buttonRoles[2]).toHaveAttribute('disabled')
  })

  it('buttonProps/paperProps', () => {
    render(
      <Calendar
        date={defaultTestDate}
        onChange={() => {}}
        paperProps={{ className: 'paperClass' }}
        buttonProps={{ className: 'buttonClass' }}
      />,
    )
    const paperTestId = screen.getByTestId('Paper')
    const cellRoles = screen.getAllByRole('gridcell')

    expect(paperTestId).toHaveClass('paperClass')
    expect(cellRoles[1]).toHaveClass('buttonClass')
    expect(cellRoles[20]).toHaveClass('buttonClass')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<Calendar date={defaultTestDate} onChange={spy} />)
    const cellRoles = screen.getAllByRole('gridcell')

    fireEvent.click(cellRoles[5])
    expect(spy).toHaveBeenCalledWith(startOfDay(defaultTestDate))
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Calendar ref={ref} date={defaultTestDate} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Calendar date={defaultTestDate} onChange={() => {}} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
