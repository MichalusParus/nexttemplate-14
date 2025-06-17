import '@testing-library/jest-dom'

import { addYears } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'

import { defaultTestDate } from '@/components/molecules/form/comboboxes/DatePickerField/DatePicker/DatePicker.test'

import { fireEvent, render, screen, within } from '../../../../../../.jest/customRender'
import { YearPicker } from '.'

expect.extend(toHaveNoViolations)

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('YearPicker', () => {
  it('default', () => {
    render(
      <YearPicker year={defaultTestDate} setCalendarState={() => {}} setCurrentMonth={() => {}} />,
    )
    const gridRole = screen.getByRole('grid')
    const rowRoles = screen.getAllByRole('row')
    const cellRoles = screen.getAllByRole('gridcell')
    const selectedText = screen.getByText('2023')

    expect(gridRole).toBeInTheDocument()
    expect(gridRole).toHaveClass('grid grid-cols-5')
    expect(rowRoles[0]).toHaveClass('contents')
    rowRoles.forEach((row, i) => {
      if (i !== rowRoles.length - 1) {
        expect(within(row).getAllByRole('gridcell')).toHaveLength(5)
      }
    })
    expect(cellRoles.length).toBeGreaterThan(0)
    expect(selectedText).toHaveClass('selected')
    expect(selectedText).toHaveAttribute('aria-selected')
  })

  it('minMax', () => {
    render(
      <YearPicker
        year={defaultTestDate}
        minMaxDate={{ min: addYears(defaultTestDate, -1), max: addYears(defaultTestDate, 1) }}
        setCalendarState={() => {}}
        setCurrentMonth={() => {}}
      />,
    )
    const previousYearText = screen.queryByText('2021')
    const nextYearText = screen.queryByText('2025')

    expect(previousYearText).toBeNull()
    expect(nextYearText).toBeNull()
  })

  it('buttonProps', () => {
    render(
      <YearPicker
        year={defaultTestDate}
        setCalendarState={() => {}}
        setCurrentMonth={() => {}}
        buttonProps={{ className: 'className' }}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')

    expect(cellRoles[0]).toHaveClass('className')
    expect(cellRoles[1]).toHaveClass('className')
  })

  it('setCurrentMondth', () => {
    const spy = jest.fn()
    render(<YearPicker year={defaultTestDate} setCalendarState={spy} setCurrentMonth={spy} />)
    const currentYearText = screen.getByText('2023')

    fireEvent.click(currentYearText)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(defaultTestDate)
    expect(spy).toHaveBeenCalledWith('months')
  })

  it('axe', async () => {
    const { container } = render(
      <YearPicker year={defaultTestDate} setCalendarState={() => {}} setCurrentMonth={() => {}} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
