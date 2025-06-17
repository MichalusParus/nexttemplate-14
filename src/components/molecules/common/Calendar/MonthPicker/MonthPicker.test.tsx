import '@testing-library/jest-dom'

import { addMonths, startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'

import { defaultTestDate } from '@/components/molecules/form/comboboxes/DatePickerField/DatePicker/DatePicker.test'

import { fireEvent, render, screen, within } from '../../../../../../.jest/customRender'
import { MonthPicker } from '.'

expect.extend(toHaveNoViolations)

describe('MonthPicker', () => {
  it('default', () => {
    render(
      <MonthPicker
        month={defaultTestDate}
        setCalendarState={() => {}}
        setCurrentMonth={() => {}}
      />,
    )
    const gridRole = screen.getByRole('grid')
    const rowRoles = screen.getAllByRole('row')
    const cellRoles = screen.getAllByRole('gridcell')

    expect(gridRole).toBeInTheDocument()
    expect(gridRole).toHaveClass('grid grid-cols-3')
    expect(rowRoles).toHaveLength(4)
    expect(rowRoles[0]).toHaveClass('contents')
    rowRoles.forEach(row => {
      expect(within(row).getAllByRole('gridcell')).toHaveLength(3)
    })
    expect(cellRoles).toHaveLength(12)
    expect(cellRoles[0]).toHaveTextContent('January')
    expect(cellRoles[0]).toHaveAttribute('aria-label', 'January')
    expect(cellRoles[2]).toHaveClass('selected')
    expect(cellRoles[2]).toHaveAttribute('aria-selected')
    expect(cellRoles[0]).toHaveAttribute('aria-selected', 'false')
  })

  it('minMax', () => {
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
    const cellRoles = screen.getAllByRole('gridcell')

    expect(cellRoles[0]).toHaveAttribute('disabled')
    expect(cellRoles[4]).toHaveAttribute('disabled')
  })

  it('buttonProps', () => {
    render(
      <MonthPicker
        month={defaultTestDate}
        setCalendarState={() => {}}
        setCurrentMonth={() => {}}
        buttonProps={{ className: 'className' }}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')

    expect(cellRoles[0]).toHaveClass('className')
    expect(cellRoles[1]).toHaveClass('className')
  })

  it('setCurrentMonth', () => {
    const spy = jest.fn()
    render(<MonthPicker month={defaultTestDate} setCalendarState={spy} setCurrentMonth={spy} />)
    const cellRoles = screen.getAllByRole('gridcell')

    fireEvent.click(cellRoles[2])
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(startOfDay(defaultTestDate))
    expect(spy).toHaveBeenCalledWith('days')
  })

  it('axe', async () => {
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
